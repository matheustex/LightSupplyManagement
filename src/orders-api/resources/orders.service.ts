import { DB } from './../../../shared/db';
import { Order } from './orders.model';

export class OrdersService extends DB<Order, string> {

  constructor() {
    super(process.env.ORDERS_TABLE)
  }

  /**
   * Create Order
   * @param params
   */
   async createOrder (params: Order): Promise<Order> {
    try {
      const { related, name } = params;

      if (typeof related !== 'string' && typeof name !== 'string') {
        throw new Error('No related date found');
      }

      const request = { ...params, status: 'PENDING', total: 0, quantity: 0};
      const response = await this.save(request)

      return response;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  /**
   * Update a order by id
   * @param id
   * @param data
   */
  public async updateOrder (order: Order): Promise<Order> {
    try {
      const orderUpdated = await this.update(order);
      return orderUpdated;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  public async listOrders (): Promise<Order> {
    try {
      const orders = await this.findAll()
      return orders;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  public async getOrder (id: string): Promise<Order> {
    try {
      const orderUpdated = await this.findOne(id)
      return orderUpdated;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}