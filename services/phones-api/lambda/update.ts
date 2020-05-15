import * as dynamoDbLib from "../../../libs/dynamodb-lib"
import { success, failure } from "../../../libs/response-lib";

export const main = async (event) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be updated
        // - 'phoneId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            phoneId: event.pathParameters.phoneId,
            model: event.pathParameters.model
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        await dynamoDbLib.call("update", params);
        return success({status: true});
    } catch (e) {
        return failure({status: false});
    }
};
