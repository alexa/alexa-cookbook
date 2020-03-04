#!/usr/bin/env bash

PROJECT_NAME="PingMe"

 aws cloudformation deploy --template-file ./pingme.yaml --stack-name $PROJECT_NAME --parameter-overrides ProjectName=$PROJECT_NAME  --capabilities CAPABILITY_IAM

#    PACKAGE_BUCKET="ask-samples-resources"
#    BUCKET_FOLDER="code-packages"
#    OBJECT_NAME="proactive-events-skill.zip"
#
##    PACKAGE_BUCKET="ask-samples-us-east-1-region"
##    BUCKET_FOLDER="proactive-events-demo"
##    OBJECT_NAME="proactive-events-skill.zip"
#
#    cd ../lambda
#    rm $OBJECT_NAME
#    cd custom
#    npm install
#    rm -rf node_modules/aws-sdk # unnecessary within Lambda, smaller size enables code editor
#
#    zip  ../$OBJECT_NAME * –X -r
#    cd ..
#    # aws lambda update-function-code --function-name ask-custom-PingMe --zip-file fileb://index.zip
#    aws s3 cp $OBJECT_NAME s3://$PACKAGE_BUCKET/$BUCKET_FOLDER/$OBJECT_NAME --profile vde
#    cd ../sam
#
#    # aws cloudformation package --template-file ./sam.yaml --s3-bucket $PACKAGE_BUCKET --s3-prefix $BUCKET_FOLDER --output-template-file ./packaged-pingme.yaml --profile vde

