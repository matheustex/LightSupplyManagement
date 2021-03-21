import { OrdersController } from './controller';
import { Handler, Context } from 'aws-lambda';

const ordersController = new OrdersController();

export const createOrder: Handler = (event: any, context: Context) => {
  return ordersController.create(event, context);
};

export const updateOrder: Handler = (event: any) => ordersController.update(event)

export const listOrder: Handler = (event: any) => ordersController.list()

export const getOrder: Handler = (event: any, context: Context) => {
  return ordersController.get(event);
};