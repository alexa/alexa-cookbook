# -*- coding: utf-8 -*-
#
# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights
# Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License").
# You may not use this file except in compliance with the License.
# A copy of the License is located at
#
# http://aws.amazon.com/apache2.0/
#
# or in the "license" file accompanying this file. This file is
# distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
# OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the
# License.
#
import argparse
import json
import socket
import os.path
import six
import re
import typing
if typing.TYPE_CHECKING:
    from typing import Dict, Any, List, AnyStr, Tuple
if six.PY2:
    import imp
else:
    import importlib.util

HTTP_HEADER_DELIMITER = '\r\n'
HTTP_BODY_DELIMITER = '\r\n\r\n'
CONTENT_LENGTH = 'Content-Length'


if six.PY3:
    HTTP_HEADER_DELIMITER = HTTP_HEADER_DELIMITER.encode('utf-8')
    HTTP_BODY_DELIMITER = HTTP_BODY_DELIMITER.encode('utf-8')
    CONTENT_LENGTH = CONTENT_LENGTH.encode('utf-8')

NUMBER_OF_UNACCEPTED_CONN = 0
CONTENT_LENGTH_REGEX = re.compile("Content-Length: (.*?)\r\n".encode('utf-8'))


def _validate_port(port_number):
    # type: (int) -> None
    """
    Validates the user provided port number.

    Verifies port number is within the legal range
    - [0, 65535]

    :param port_number: Port Number where the socket
                        connection will be established.
    :type port_number: int
    :return: None
    :raises: ValueError when port is not in legal range [0, 65535]
    """
    if(port_number < 0 or port_number > 65535):
        raise ValueError('Port out of legal range: {0}. The port number '
                         'should be in the range [0, 65535]'
                         .format(port_number))
    if(port_number == 0):
        print('The TCP server will listen on a port that is free. Check logs '
              'to find out what port number is being used')
    return None


def _validate_skillfile_exists(skill_entry_file):
    # type: (str) -> None
    """
    Validates the user provided skill file exists.

    Verifies the skill file(responsible for initializing the skill builder
    and managing handlers) exists in the path specified

    :param skill_entry_file: Path of the skill file
    :type skill_entry_file: str
    :return: None
    :raises: ValueError when file doesn't exist
    """
    if not os.path.isfile(skill_entry_file):
        raise ValueError("File not found: {0}".format(skill_entry_file))
    return None


def _setup_and_validate_arguments():
    # type: () -> argparse.Namespace
    """
    Invokes fns to parse and validate arguments.

    :param: None
    :return: Parsed arguments
    :rtype: argparse.Namespace
    """
    parser = _parse_arguments()
    args = parser.parse_args()
    _validate_port(args.portNumber)
    _validate_skillfile_exists(args.skillEntryFile)
    return args


def _parse_arguments():
    # type: () -> argparse.ArgumentParser
    """
    Parses arguments(with help statments).

    Parses user provided arguments - portNumber, skillEntryFile
    and lambdaHandler name
    :param: None
    :return: Argument Parser
    :rtype: argparse.ArgumentParser
    """
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', '--portNumber',
                        help='Port number to listen for incoming '
                             'skill requests',
                        default=0, type=int)
    parser.add_argument('-f', '--skillEntryFile',
                        help='Location of the skill file where skill builder '
                             'and handlers are initialized', type=str)
    parser.add_argument('-l', '--lambdaHandler',
                        help='Name of the lambda handler function',
                        default='handler', type=str)
    return parser


def _get_request_envelope(data):
    # type: (List[AnyStr]) -> Dict[str, str]
    """
    Constructs the requestEnvelope

    :param data: Incoming data on the socket connection captured in the
                 form of a list
    :type skill_entry_file: List[str]
    :return: Request body as a dictionary
    :rtype: Dict[str, str]
    """
    request_body = _combine_received_data(data).decode('utf-8')
    print('Request envelope: {0}'.format(request_body))
    return json.loads(request_body)


def _setup_socket():
    # type: () -> socket.socket
    """
    Setup socket to listen and respond to skill requests.

    :param: None
    :return: Socket for the local debugging.
    :rtype: socket.socket
    """
    local_debugger_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    local_debugger_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server_address = ('localhost', args.portNumber)
    local_debugger_socket.bind(server_address)
    print('Starting server on: {0}'.format(
        local_debugger_socket.getsockname()))
    return local_debugger_socket


def _initialize_skill_invoker():
    # type: () -> Any
    """
    Initialize skill invoker based on skill file path argument.

    :param: None
    :return: Module used to invoke the skill handler.
    :rtype: Object
    """
    if six.PY2:
        skill_invoker = imp.load_source(
            args.lambdaHandler, args.skillEntryFile)
    else:
        spec = importlib.util.spec_from_file_location(
            args.lambdaHandler, args.skillEntryFile)
        skill_invoker = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(skill_invoker)
    return skill_invoker


def _send_response(response, socket_connection):
    # type: (str, socket.socket) -> None
    """
    Sends http response to skill request.

    :param reponse: Response envelope returned by the skill handler
    :type reponse: str
    :param socket_connection: Socket connection for sending skill response
    :type socket_connection: socket.socket
    :return: None
    """
    print('Response envelope: {0}'.format(response))
    socket_connection.send('HTTP/1.1 200 OK{0}Content-Type: application/json;'
                           'charset=UTF-8{0}Content-Length: {1}{2}{3}'.format(
                               HTTP_HEADER_DELIMITER.decode('utf-8'),
                               len(response),
                               HTTP_BODY_DELIMITER.decode(
                                   'utf-8'), response).encode('utf-8'))


def _get_content_length_and_body(data, content_length):
    # type(List[AnyStr], int) -> int, List[AnyStr], bool
    """
    Gets the Content-Length value and start capturing request body.

    Combines the data captured over the socket connection so far
    and looks for Content-Length value and the start of request body

    Following the HTTP request pattern as
    HEADERS\r\n\r\nBody, the \r\n\r\n is used to extract the
    body from the HTTP request. The original data List is overwritten
    to start capturing just the request body

    If both Content-Length and message body aren't discovered, the
    original values are returned.

    :param data: Data captured over socket connection
    :type data: List[AnyStr]
    :param content_length: Content-Length of the request body. Default is -1
    :type content_length: int
    :return content_length: Content-Length of the request body
    :return data: Data captured over socket connection
    :return content_length_unidentified: Boolean value whether Content-Length
                                         has been identified. Defaults to True
    :rtype: (int, List[AnyStr], bool)
    """
    received_data = _combine_received_data(data)
    content_length_unidentified = True
    if (HTTP_BODY_DELIMITER in received_data and
            CONTENT_LENGTH in received_data):
        content_length = int(CONTENT_LENGTH_REGEX.findall(received_data)[0])
        received_data = received_data.split(
            HTTP_BODY_DELIMITER)[-1:][0]
        content_length_unidentified = False
        data = []
        data.append(received_data)
    return content_length, data, content_length_unidentified


def _combine_received_data(combined_data):
    # type(List[AnyStr]) -> AnyStr
    """
    Combines data captured over the socket connection to string or byte literal.

    :param data: Data captured over socket connection
    :type data: List[AnyStr]
    :return combined_data: Combined string or byte literal
    :rtype content_length: AnyStr
    """
    if six.PY2:
        combined_data = ''.join(combined_data)
    else:
        combined_data = b''.join(combined_data)
    return combined_data


def _handle_skill_request(client_address, socket_connection, skill_invoker):
    # type(Tuple, socket.socket, Any) -> None
    """
    Receives data over the socket connection, invokes skill handler with request envelope and sends skill response

    :param client_adress: Requestor address
    :type client_adress: Tuple
    :param socket_connection: Socket connection for receiving skill request
    :type socket_connection: socket.socket
    :param skill_invoker: Module used to invoke the skill handler.
    :type skill_invoker: Object
    :return: None
    """
    print('Connection from {0}'.format(client_address))
    content_length_unidentified = True
    content_length = -1
    data = []
    while (content_length_unidentified or
           len(_combine_received_data(data)) < content_length):
        data.append(socket_connection.recv(16))
        if content_length_unidentified:
            content_length, data, content_length_unidentified = (
                _get_content_length_and_body(data, content_length))
    _send_response(json.dumps(getattr(skill_invoker, args.lambdaHandler)(
        _get_request_envelope(data), None)), socket_connection)


def main():
    try:
        local_debugger_socket = _setup_socket()
        # NUMBER_OF_UNACCEPTED_CONN is set to 0. The socket will
        # accept any backlog connection requests.
        local_debugger_socket.listen(NUMBER_OF_UNACCEPTED_CONN)
        skill_invoker = _initialize_skill_invoker()

        while True:
            print('Waiting for a socket connection')
            socket_connection, client_address = local_debugger_socket.accept()
            try:
                _handle_skill_request(client_address,
                                      socket_connection, skill_invoker)
            finally:
                socket_connection.close()
    finally:
        local_debugger_socket.close()


if __name__ == '__main__':
    args = _setup_and_validate_arguments()
    main()
