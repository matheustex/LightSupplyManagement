import { DBBase } from './interfaces/db-base.interface';
import { v4 as uuid } from 'uuid';
import dynamoDb from './dynamoAdapter';
import { utils } from './utils';

export class DB<T, ID> implements DBBase<T, ID> {
  protected table: string;
  constructor(table){
    this.table = table;
  };

  async save(req: T): Promise<T> {
    const item = this.buildModel(req);

    const params = {
      TableName: this.table,
      Item: item,
    };

    await dynamoDb.put(params).promise()
      .catch((err) => {
        console.log('Error:', err)
        return err;
      })

    return item;
  }

  async update(item: any): Promise<any> {
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
      TableName: this.table,
      Key: {
        'id': item.id
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues
    };

   const { Attributes: itemUpdated } = await dynamoDb.update(params).promise();

    return itemUpdated;
  }

  async findOne(id: ID): Promise<any> {
    const params = {
      TableName: this.table,
      Key: {
        id: id
      },
    };

    const { Item } = await dynamoDb.get(params).promise()
      .catch((err) => {
        console.log('Error:', err)
        return err;
      });

    return Item;
  }

  async findAll(): Promise<any> {
    const params = {
      TableName: this.table
    };

    const { Items = [] } = await dynamoDb.scan(params).promise()
      .catch((err) => {
        console.log('Error:', err)
        return err;
      });

    return Items;
  }
  
  delete() {
    return "teste";
  }

  private buildModel(item: any) {
    return {
      ...item,
      id: uuid(),
      created: utils.now(),
      updated: utils.now()
    };
  };
}