import * as dynamoDbLib from "../../../libs/dynamodb-lib"
import { success, failure } from "../../../libs/response-lib";

export const main = async (event) => {
    const params = {
        TableName: process.env.tableName,
        // 'KeyConditionExpression' defines the condition for the query
        // - 'phoneId = :phoneId': only return items with matching 'phoneId'
        //   partition key
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':phoneId': defines 'phoneId' to be Identity Pool identity id
        //   of the authenticated user
        KeyConditionExpression: "phoneId = :phoneId",
        ExpressionAttributeValues: {
            ":phoneId": event.pathParameters.phoneId
        }
    };

    try {
        const result = await dynamoDbLib.call("query", params);
        // Return the matching list of items in response body
        return success(result.Items);
    } catch (e) {
        return failure({status: false});
    }
};
