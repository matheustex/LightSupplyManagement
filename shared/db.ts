const uuid = require('uuid');
const AWS = require('aws-sdk');

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
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*" // Required for CORS support to work
          },
          body: JSON.stringify(data.Items)
        }
      }).catch((err) => {
        console.log('Error:', err)
        return err;
      });
  }

  update() {
    return "Teste";
  }

  delete() {
    return "teste";
  }

  private buildModel(item: any) {
    const now = new Date().toISOString();
    return {
      ...item,
      id: uuid.v1(),
      created: now,
      updated: now
    };
  };
}