import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { DB } from '../../shared/db';

const db: DB = new DB();

export const get: APIGatewayProxyHandler = async (event, _context) => {
  console.log("starting event");
  const res = await db.get(process.env.ORDERS_TABLE, event.pathParameters.id);

  return res
}

export const create: APIGatewayProxyHandler = async (event, _context) => {
  const requestBody = JSON.parse(event.body);

  const { related } = requestBody;

  if (typeof related !== 'string') {
    return new Error('No related date found');
  }

  const res = await db.create(process.env.ORDERS_TABLE, requestBody);

  return res;
}

export const list: APIGatewayProxyHandler = async (_event, _context) => {
  console.log("starting event");
  const res = await db.list(process.env.ORDERS_TABLE);

  return res
}
