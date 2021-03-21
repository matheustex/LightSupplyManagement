import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { DB } from 'src/utils/db';

const db: DB = new DB();

export const get: APIGatewayProxyHandler = async (event, _context) => {
  console.log("starting event");
  const res = await db.get(process.env.DEPARTMENTS_TABLE, event.pathParameters.id);

  return res
}

export const create: APIGatewayProxyHandler = async (event, _context) => {
  const requestBody = JSON.parse(event.body);

  const res = await db.create(process.env.DEPARTMENTS_TABLE, requestBody);

  return res;
}

export const list: APIGatewayProxyHandler = async (_event, _context) => {
  console.log("starting event");
  const res = await db.list(process.env.DEPARTMENTS_TABLE);

  return res
}
