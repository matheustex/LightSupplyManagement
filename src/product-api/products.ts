import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { DB } from '../../shared/db';

const db: DB = new DB();

export const get: APIGatewayProxyHandler = async (event, _context) => {
  console.log("starting event");
  const res = await db.findOne(process.env.PRODUCTS_TABLE, event.pathParameters.id);

  return res
}

export const create: APIGatewayProxyHandler = async (event, _context) => {
  console.log("starting event");
  const requestBody = JSON.parse(event.body);

  const { fullName, email, age } = requestBody;

  if (typeof fullName !== 'string' || typeof email !== 'string' || typeof age !== 'number') {
    return new Error('Could create user because of validation errors.');
  }

  const res = await db.save(process.env.PRODUCTS_TABLE, requestBody);

  return res;
}
