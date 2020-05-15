import * as uuid from "uuid";
import * as dynamoDbLib from "../../../libs/dynamodb-lib"
import { success, failure } from "../../../libs/response-lib";

export const main = async (event) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
            phoneId: uuid.v4(),
            model: data.model,
            brand: data.brand,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({status: false});
    }
}
