import { MessageUtil } from '../../../shared/message';
import { OrdersService } from './orders.service';
import { Context } from 'aws-lambda';
import { Order } from './orders.model';

export class OrdersController {
  constructor (private readonly _service: OrdersService) {}

  async save (event: any, context?: Context) {
    console.log('functionName', context?.functionName);
    const params: Order = JSON.parse(event.body);

    try {
      const result = await this._service.createOrder(params);

      console.log(result);

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
      const result = await this._service.getOrder(id);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async findAll () {
    try {
      const result = await this._service.listOrders();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}