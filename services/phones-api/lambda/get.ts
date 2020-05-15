import * as dynamoDbLib from "../../../libs/dynamodb-lib"
import { success, failure } from "../../../libs/response-lib";

export const main = async (event) => {
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'phoneId': Identity Pool identity id of the authenticated user
        // - 'model': path parameter
        Key: {
            phoneId: event.pathParameters.id,
            model: event.pathParameters.model
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if (result.Item) {
            // Return the retrieved item
            return success(result.Item);
        } else {
            return failure({status: false, error: "Item not found."});
        }
    } catch (e) {
        console.log(e)
        return failure({status: false});
    }
};
