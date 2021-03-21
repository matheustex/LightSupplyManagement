import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true
});

export class DB {
  create(table: string, req: any): Promise<any> {
    console.log('START CREATE REQUEST');

    let item = this.buildModel(req);

    const params = {
      TableName: table,
      Item: item,
    };

    return dynamoDb.put(params).promise()
      .then((data) => {
        console.log('REQUEST SUCCESSED ', data);
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*" // Required for CORS support to work
          },
          body: JSON.stringify(item)
        }
      }).catch((err) => {
        console.log('Error:', err)
        return err;
      })
  }

  get(table: string, id: string): any {
    const params = {
      TableName: table,
      Key: {
        id: id
      },
    };

    return dynamoDb.get(params).promise()
      .then((data) => {
        console.log(data);
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*" // Required for CORS support to work
          },
          body: JSON.stringify(data.Item)
        }
      }).catch((err) => {
        console.log('Error:', err)
        return err;
      });
  }

  list(table: string) {
    let params = {
      TableName: table
    };

    return dynamoDb.scan(params).promise()
      .then((data) => {
        console.log(data);
        return data.Items;
      }).catch((err) => {
        console.log('Error:', err)
        return err;
      });
  }
  
  update(table: string, item: any) {
    item.updated = new Date().toISOString();

    let updateExpression = 'set ';
    let expressionAttributeValues = {};
    let expressionAttributeNames = {};

    for (const property in item) {
      updateExpression += ` #${property} = :${property} ,`;
      expressionAttributeNames['#' + property] = property;
      expressionAttributeValues[':' + property] = item[property];
    }

    // Cleaning the last comma to not break the update expression
    updateExpression = updateExpression.slice(0, -1);

    const params = {
      TableName: table,
      Key: {
        'id': item.id
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues
    };

   return dynamoDb.update(params).promise();
  }

  delete() {
    return "teste";
  }

  private buildModel(item: any) {
    const now = new Date().toISOString();
    return {
      ...item,
      id: uuid(),
      created: now,
      updated: now
    };
  };
}