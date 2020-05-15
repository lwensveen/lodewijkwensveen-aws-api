import { v4 as uuidv4 } from 'uuid';
import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { failure, success } from '../../libs/response-lib';

export const main = async (event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
            phoneId: uuidv4(),
            contentId: uuidv4(),
            content: data.content,
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
