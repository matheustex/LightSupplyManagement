/* istanbul ignore file */

module.exports = {
  tables: [
    {
      TableName: 'orders',
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  ],
  basePort: 3001,
};
