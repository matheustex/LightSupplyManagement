import { OrdersController } from './resources/orders.controller';
import { Context, APIGatewayProxyHandler } from 'aws-lambda';
import { OrdersService } from './resources/orders.service';

const service: OrdersService = new OrdersService();
const ordersController = new OrdersController(service);

export const createOrder: any = (event: any, context: Context) => {
  return ordersController.save(event, context);
};

export const updateOrder: APIGatewayProxyHandler = (event: any) => ordersController.update(event)

export const listOrder: APIGatewayProxyHandler = () => ordersController.findAll()

export const getOrder: APIGatewayProxyHandler = (event: any, context: Context) => {
  return ordersController.get(event);
};