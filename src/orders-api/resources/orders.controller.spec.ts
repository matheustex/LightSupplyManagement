import { createOrder } from './../orders';
import { HttpStatusCode } from './../../../shared/http-status-code';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from "./orders.model";
import { instance, mock, reset, when } from 'ts-mockito';
import { ApiResponseParsed } from '../../../shared/interfaces/test.interfaces';

describe('who tests the tests?', () => {
  const ordersServiceMock: OrdersService = mock(OrdersService);
  let controller: OrdersController;

  beforeEach(() => {
    reset(ordersServiceMock);
    const ordersServiceMockInstance: OrdersService = instance(ordersServiceMock);
    controller = new OrdersController(ordersServiceMockInstance);
  });

  it('can run a test', () => {
    expect.hasAssertions();
    expect(1).toBe(1);
  });

  it('should return HTTP 200 OK', async () => {
    const order = new Order();

    order.name = 'teste';
    order.related = new Date();

    const event = {
      body: JSON.stringify(order)
    }

    when(ordersServiceMock.createOrder(order)).thenReturn(Promise.resolve<Order>(order));
    const response = await createOrder(event, {});
    expect(response.statusCode).toEqual(HttpStatusCode.Success);
  })
})