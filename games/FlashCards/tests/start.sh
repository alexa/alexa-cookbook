# Test your local Node.JS lambda function with lambda-local
# Install from https://www.npmjs.com/package/lambda-local
#

lambda-local -l ../src/index.js -h handler -e events/quiztest.json
