import awsWrapped from "./aws-sdk";

export function call(action, params) {
    const dynamoDb = new awsWrapped.DynamoDB.DocumentClient();
    return dynamoDb[action](params).promise();
}
