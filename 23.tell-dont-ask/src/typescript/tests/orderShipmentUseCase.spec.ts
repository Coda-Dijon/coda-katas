import { describe, it, expect, beforeEach } from 'vitest';
import { Order } from '../domain/order';
import { OrderStatus } from '../domain/orderStatus';
import { OrderShipmentUseCase } from '../useCase/orderShipmentUseCase';
import { OrderShipmentRequest } from '../useCase/orderShipmentRequest';
import { OrderCannotBeShippedException } from '../useCase/orderCannotBeShippedException';
import { OrderCannotBeShippedTwiceException } from '../useCase/orderCannotBeShippedTwiceException';
import { TestOrderRepository } from './doubles/testOrderRepository';
import { TestShipmentService } from './doubles/testShipmentService';

describe('OrderShipmentUseCase', () => {
  let orderRepository: TestOrderRepository;
  let shipmentService: TestShipmentService;
  let useCase: OrderShipmentUseCase;

  beforeEach(() => {
    orderRepository = new TestOrderRepository();
    shipmentService = new TestShipmentService();
    useCase = new OrderShipmentUseCase(orderRepository, shipmentService);
  });

  it('ships an approved order', () => {
    const initialOrder = new Order(1, OrderStatus.Approved);
    orderRepository.addOrder(initialOrder);

    useCase.run(new OrderShipmentRequest(1));

    expect(orderRepository.getSavedOrder()!.status).toBe(OrderStatus.Shipped);
    expect(shipmentService.getShippedOrder()).toBe(initialOrder);
  });

  it('cannot ship a created order', () => {
    orderRepository.addOrder(new Order(1, OrderStatus.Created));

    expect(() => useCase.run(new OrderShipmentRequest(1))).toThrow(
      OrderCannotBeShippedException
    );
    expect(orderRepository.getSavedOrder()).toBeUndefined();
    expect(shipmentService.getShippedOrder()).toBeUndefined();
  });

  it('cannot ship a rejected order', () => {
    orderRepository.addOrder(new Order(1, OrderStatus.Rejected));

    expect(() => useCase.run(new OrderShipmentRequest(1))).toThrow(
      OrderCannotBeShippedException
    );
    expect(orderRepository.getSavedOrder()).toBeUndefined();
    expect(shipmentService.getShippedOrder()).toBeUndefined();
  });

  it('cannot ship an already shipped order', () => {
    orderRepository.addOrder(new Order(1, OrderStatus.Shipped));

    expect(() => useCase.run(new OrderShipmentRequest(1))).toThrow(
      OrderCannotBeShippedTwiceException
    );
    expect(orderRepository.getSavedOrder()).toBeUndefined();
    expect(shipmentService.getShippedOrder()).toBeUndefined();
  });
});
