import AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const dynamoBody = {
  convertEmptyValues: true,
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: 'local',
  }),
};

AWS.config.setPromisesDependency(require('bluebird'));

export default new DocumentClient(dynamoBody);
export const dynamodb = new AWS.DynamoDB(dynamoBody);
