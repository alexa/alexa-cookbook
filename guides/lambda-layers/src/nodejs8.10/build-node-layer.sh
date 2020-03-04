# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: Apache-2.0

# Tested for use on AWS Cloud9

### build layer ###
mkdir node_layer
cd node_layer
# get license
curl -g https://raw.githubusercontent.com/alexa/alexa-skills-kit-sdk-for-nodejs/2.0.x/LICENSE -o LICENSE
# build notice
echo "Alexa Skills Kit SDK for Node.js" > NOTICE
echo "Copyright 2018-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved." >> NOTICE

mkdir nodejs
cd nodejs
# get package.json
curl -o package.json https://raw.githubusercontent.com/alexa/alexa-cookbook/master/resources/lambda-layers/src/nodejs8.10/package.json
# download files
npm install
rm package-lock.json
cd node_modules
shopt -s extglob
rm -rf !(ask*|i18n*|alexa*)
cd ../..
zip ../node_layer.zip * -r


