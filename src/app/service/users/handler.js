'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const DB: DB;

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getUser = (event, context, callback) => {
  const res = this.DB


    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      callback(new Error('Could not get user.'));
      return;
    });
};

module.exports.getUsers = (event, context, callback) => {
  let params = {
    TableName: process.env.USERS_TABLE,
    ProjectionExpression: "id, fullname, email"
  };

  const onScan = (err, data) => {
    if (err) {
      console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
      callback(err);
    } else {
      console.log("Scan succeeded.");
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          users: data.Items
        })
      });
    }
  };

  dynamoDb.scan(params, onScan);

};

module.exports.createUser = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  const { fullName, email, age } = requestBody;

  if (typeof fullName !== 'string' || typeof email !== 'string' || typeof age !== 'number') {
    callback(new Error('Could create user because of validation errors.'));
    return;
  }

  createUser(userInfo(fullName, email, age))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully submitted user with email ${email}`,
          userId: res.id
        })
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit user with email ${email}`
        })
      })
    });
};

const createUser = user => {
  const userInfo = {
    TableName: process.env.USERS_TABLE,
    Item: user,
  };
  return dynamoDb.put(userInfo).promise()
    .then(res => user);
};

const userInfo = (fullname, email, age) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    fullname: fullname,
    email: email,
    age: age,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};

module.exports.updateUser = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const userId = event.pathParameters.id;

  updateUser(userId, requestBody.email)
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully submitted user ${userId}`,
          user: res
        })
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit user ${userId}`
        })
      });
    });
};

const updateUser = (userId, email) => {
  const userInfo = {
    TableName: process.env.USERS_TABLE,
    Key: {
      id: userId
    },
    UpdateExpression: "set #email = :email",
    ExpressionAttributeNames: {
      "#email": "email"
    },
    ExpressionAttributeValues: {
      ":email": email
    },
    Returnvalues: "ALL_NEW"
  };

  return dynamoDb.update(userInfo).promise()
    .then(res => res.item);
};

module.exports.deleteUser = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const userId = event.pathParameters.id;

  deleteUser(userId)
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `User ${userId} deleted`,
          user: res
        })
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to delete ${userId}`
        })
      });
    });
};

const deleteUser = userId => {
  const userInfo = {
    TableName: process.env.USERS_TABLE,
    Key: {
      id: userId
    }
  };
  return dynamoDb.delete(userInfo).promise()
    .then(res => res.item);
};
