import { DB } from '@utils/db';
import { Order } from '@model/order';

export class OrdersService {
  private db: DB;
  private table: string = process.env.ORDERS_TABLE;

  constructor() {
    this.db = new DB();
  }

  /**
   * Create Order
   * @param params
   */
  protected async createOrder (params: Order): Promise<Order> {
    try {
      const { related, name } = params;

      if (typeof related !== 'string' && typeof name !== 'string') {
        throw new Error('No related date found');
      }

      const request = { ...params, status: 'PENDING', total: 0, quantity: 0};
      const response = await this.db.create(this.table, request)

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
  protected async updateOrder (order: Order): Promise<Order> {
    try {
      const orderUpdated = await this.db.update(this.table, order);
      return orderUpdated;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  protected async listOrders (): Promise<Order> {
    try {
      const orderUpdated = await this.db.list(this.table)
      return orderUpdated;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  protected async getOrder (id: string): Promise<Order> {
    try {
      const orderUpdated = await this.db.get(this.table, id)
      return orderUpdated;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}