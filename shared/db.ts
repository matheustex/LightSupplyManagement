import { v4 as uuid } from 'uuid';
import dynamoDb from './dynamoAdapter';

export class DB {
  async save(table: string, req: any): Promise<any> {
    console.log('START CREATE REQUEST');

    let item = this.buildModel(req);

    const params = {
      TableName: table,
      Item: item,
    };

    const response = await dynamoDb.put(params).promise()
      .then(() => {
        console.log("Saving");

        return {
          item
        }
      }).catch((err) => {
        console.log('Error:', err)
        return err;
      })

    return response;
  }

  findOne(table: string, id: string): any {
    const params = {
      TableName: table,
      Key: {
        id: id
      },
    };

    return dynamoDb.get(params).promise()
      .then(({Item}) => {
        return Item;
      }).catch((err) => {
        console.log('Error:', err)
        return err;
      });
  }

  findAll(table: string) {
    const params = {
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