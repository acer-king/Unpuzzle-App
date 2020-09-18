'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { id, puzzleName } = JSON.parse(event.body);

  const params = {
    TableName: "puzzle",
    Key: {
      id: id
    },
    UpdateExpression: "Set puzzleName = :n",
    ExpressionAttributeValues: {
      ":n": puzzleName
    },
    ReturnValues: "UPDATED_NEW"
  };
  
  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch(err) {
    responseBody = `Unable to update puzzle: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};