import { OrdersService } from '@service/orders/orders';
import { Context } from 'aws-lambda';
import { MessageUtil } from '@utils/message';
import { Order } from '@model/order';

export class OrdersController extends OrdersService {
  constructor () {
    super();
  }

  async create (event: any, context?: Context) {
    console.log('functionName', context.functionName);
    const params: Order = JSON.parse(event.body);

    try {
      const result = await this.createOrder(params);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async update (event: any) {
    const body: object = JSON.parse(event.body);

    try {
      const result = await this.update(body);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async get (event: any) {
    try {
      const id: string = event.pathParameters.id;
      const result = await this.getOrder(id);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async list () {
    try {
      const result = await this.listOrders();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}