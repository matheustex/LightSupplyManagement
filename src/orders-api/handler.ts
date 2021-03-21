import { OrdersController } from './orders.controller';
import { Handler, Context } from 'aws-lambda';

const ordersController = new OrdersController();

export const createOrder: Handler = (event: any, context: Context) => {
  return ordersController.save(event, context);
};

export const updateOrder: Handler = (event: any) => ordersController.update(event)

export const listOrder: Handler = () => ordersController.findAll()

export const getOrder: Handler = (event: any, context: Context) => {
  return ordersController.get(event);
};