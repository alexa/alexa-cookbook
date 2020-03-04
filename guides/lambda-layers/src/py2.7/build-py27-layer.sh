# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: Apache-2.0

# Tested for use on AWS Cloud9

### build layer ###
mkdir py27_layer
cd py27_layer
# get license
curl -g https://raw.githubusercontent.com/alexa/alexa-skills-kit-sdk-for-python/master/LICENSE -o LICENSE
# build notice
echo "Alexa Skills Kit SDK for Python" > NOTICE
echo "Copyright 2018-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved." >> NOTICE

mkdir python
# get requirements.txt
curl -o requirements.txt https://raw.githubusercontent.com/alexa/alexa-cookbook/master/resources/lambda-layers/src/py27/requirements.txt
# download files
python27 -m pip install -r requirements.txt -t python
cd python
shopt -s extglob
rm -rf !(ask*|certifi*|chardet*|dateutil*|idna*|requests*|urllib3*|six.py|typing.py|concurrent*|enum*)
cd ..
zip ../py27_layer.zip * -r


