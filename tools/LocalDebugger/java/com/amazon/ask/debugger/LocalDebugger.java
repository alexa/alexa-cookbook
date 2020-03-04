/*
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

package com.amazon.ask.debugger;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.util.Arrays;
import java.util.List;

public class LocalDebugger {
    private static final String SKILL_ENTRY_CLASS = "skillStreamHandlerClass";
    private static final String HANDLE_REQUEST = "handleRequest";
    private static final String PORT_NUMBER = "portNumber";
    private static final String HTTP_HEADER_DELIMITER = "\r\n";
    private static final String HTTP_BODY_DELIMITER = "\r\n\r\n";
    private static final DebugLambdaContext DEBUG_LAMBDA_CONTEXT = new DebugLambdaContext();

    private static int port;
    private static Class<?> skillInvokerClass;
    private static Object skillInvoker;
    private static Method lambdaHandlerMethod;
    private static List<String> argumentList;
    private static BufferedWriter socketOutputWriter;
    private static BufferedReader socketInputReader;
    private static ServerSocket localDebuggerSocket;

    /**
     * Entry point for the local debugger. 1. Sets up debug infrastructure. 2.
     * Listens on socket connection for incoming skill requests. 3. Invokes the
     * lambda "handleRequest" method with skill request envelope. 4. Sends the skill
     * response.
     * 
     * @param args array of arguments
     * @throws ClassNotFoundException
     * @throws InstantiationException
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws NoSuchMethodException
     * @throws SocketException
     * @throws IOException
     */
    public static void main(String[] args) throws ClassNotFoundException, InstantiationException,
            IllegalAccessException, InvocationTargetException, NoSuchMethodException, SocketException, IOException {
        argumentList = Arrays.asList(args);
        setupDebugInfrastructure();
        while (!localDebuggerSocket.isClosed()) {
            Socket socketConnection = localDebuggerSocket.accept();
            socketOutputWriter = new BufferedWriter(new OutputStreamWriter(socketConnection.getOutputStream()));
            socketInputReader = new BufferedReader(new InputStreamReader(socketConnection.getInputStream()));
            ByteArrayOutputStream skillResponseByteArray = new ByteArrayOutputStream();
            lambdaHandlerMethod.invoke(skillInvoker, new ByteArrayInputStream(getRequestEnvelope().getBytes()),
                    skillResponseByteArray, DEBUG_LAMBDA_CONTEXT);
            String jsonResponse = skillResponseByteArray.toString("UTF-8");
            System.out.println(String.format("Response envelope :%s", jsonResponse));
            socketOutputWriter.write(String.format(
                    "HTTP/1.1 200 OK%2$sContent-Type: application/json;charset=UTF-8%2$sContent-Length: %d%3$s%4$s",
                    jsonResponse.length(), HTTP_HEADER_DELIMITER, HTTP_BODY_DELIMITER, jsonResponse));
            socketOutputWriter.close();
        }
    }

    /**
     * Setup debug infrastructure - 1. Read user provided arguments 2. Setup socket
     * listener
     * 
     * @throws ClassNotFoundException
     * @throws InstantiationException
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws NoSuchMethodException
     * @throws IOException
     * @throws SocketException
     */
    private static void setupDebugInfrastructure() throws ClassNotFoundException, InstantiationException,
            IllegalAccessException, InvocationTargetException, NoSuchMethodException, IOException, SocketException {
        initializeArguments();
        setupDebuggerSocket();
    }

    /**
     * Initializes user provided port number and package name for the lambda skill
     * entry file.
     * 
     * @throws ClassNotFoundException
     * @throws InstantiationException
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws NoSuchMethodException
     */
    private static void initializeArguments() throws ClassNotFoundException, InstantiationException,
            IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        initializeSkillInvoker();
        getAndValidatePortNumber();
    }

    /**
     * Gets and verifies the user provided port number is in legal range [0, 65535].
     * 
     * @return port number for hosting the local debug session
     * @throws NumberFormatException
     * @throws IllegalAccessException
     */
    private static Integer getAndValidatePortNumber() throws NumberFormatException, IllegalAccessException {
        port = Integer.parseInt(getArgumentValue(PORT_NUMBER, 0).toString());
        if (port < 0 || port > 65535) {
            throw new IllegalArgumentException(String
                    .format("Port out of legal range: %d. The port number should be in the range [0, 65535]", port));
        }
        if (port == 0) {
            System.out.println(
                    "The TCP server will listen on a port that is free. Check logs to find out what port number is being used");
        }
        return port;
    }

    /**
     * Gets the value for a specified argument.
     * 
     * @param argumentName - name of the argument.
     * @param defaultValue - default value for the argument.
     * @return value of a specifed argument name.
     * @throws IllegalAccessException
     */
    private static Object getArgumentValue(String argumentName, Object defaultValue) throws IllegalAccessException {
        Integer index = argumentList.indexOf(String.format("--%s", argumentName));
        if (index == -1) {
            if (defaultValue == null) {
                throw new IllegalAccessException(String.format("Required argument - %s not provided.", argumentName));
            }
            return defaultValue;
        }
        index++;
        if (index >= argumentList.size()) {
            throw new ArrayIndexOutOfBoundsException(
                    String.format("Value doesn't exist for the argument - %s at index - %d", argumentName, index));
        }
        return argumentList.get(index);
    }

    /**
     * Initializes the skill's handle request method using the user provided skill
     * package name via reflection.
     * 
     * @throws ClassNotFoundException
     * @throws InstantiationException
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws NoSuchMethodException
     */
    private static void initializeSkillInvoker() throws ClassNotFoundException, InstantiationException,
            IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        skillInvokerClass = Class.forName(getArgumentValue(SKILL_ENTRY_CLASS, null).toString());
        skillInvoker = skillInvokerClass.getConstructor().newInstance();
        Class<?>[] paramTypes = { java.io.InputStream.class, java.io.OutputStream.class,
                com.amazonaws.services.lambda.runtime.Context.class };
        lambdaHandlerMethod = skillInvokerClass.getMethod(HANDLE_REQUEST, paramTypes);
    }

    /**
     * Setup socket to listen and respond to skill requests.
     * 
     * @throws IOException
     * @throws SocketException
     */
    private static void setupDebuggerSocket() throws IOException, SocketException {
        localDebuggerSocket = new ServerSocket(port);
        localDebuggerSocket.setReuseAddress(true);
        System.out.println(String.format("Starting server on port - %s", localDebuggerSocket.getLocalPort()));
    }

    /**
     * Extracts the body of the incoming HTTP skill request.
     * 
     * @return request envelope from the incoming skill request
     * @throws IOException
     */
    private static String getRequestEnvelope() throws IOException {
        // code to parse through header data
        while ((socketInputReader.readLine()).length() != 0) {
        }

        // code to read the post payload data
        StringBuilder payload = new StringBuilder();
        while (socketInputReader.ready()) {
            payload.append((char) socketInputReader.read());
        }
        System.out.println(String.format("Request envelope :%s", payload.toString()));
        return payload.toString();
    }
}