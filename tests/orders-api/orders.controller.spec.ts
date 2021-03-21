import { OrdersController } from '../../src/orders-api/orders.controller';
import { Order } from "../../model/order";

describe('who tests the tests?', () => {
  const controller = new OrdersController();

  it('can run a test', () => {
    expect.hasAssertions();
    expect(1).toBe(1);
  });

  it('when create a order expects return it', async () => {
    const order = new Order();

    console.log(process.env.ORDERS_TABLE);

    order.name = 'test';
    order.related = new Date();

    console.log(order.related);

    const response = await controller.save({body: JSON.stringify(order)})

    const orderSaved = controller.get(response.body.id);

    expect.hasAssertions();
    expect(orderSaved.name).toBe(order.name);
  });
})