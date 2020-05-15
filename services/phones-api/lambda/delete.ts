import * as dynamoDbLib from "../../../libs/dynamodb-lib"
import { success, failure } from "../../../libs/response-lib";

export const main = async (event) => {
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be removed
        // - 'phoneId': Identity Pool identity id of the authenticated user
        // - 'model': path parameter
        Key: {
            phoneId: event.pathParameters.phoneId,
            model: event.pathParameters.model
        }
    };

    try {
        await dynamoDbLib.call("delete", params);
        return success({status: true});
    } catch (e) {
        return failure({status: false});
    }
};
