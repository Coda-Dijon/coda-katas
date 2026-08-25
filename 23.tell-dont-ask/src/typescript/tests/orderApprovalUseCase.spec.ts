import { describe, it, expect, beforeEach } from 'vitest';
import { Order } from '../domain/order';
import { OrderStatus } from '../domain/orderStatus';
import { OrderApprovalUseCase } from '../useCase/orderApprovalUseCase';
import { OrderApprovalRequest } from '../useCase/orderApprovalRequest';
import { RejectedOrderCannotBeApprovedException } from '../useCase/rejectedOrderCannotBeApprovedException';
import { ApprovedOrderCannotBeRejectedException } from '../useCase/approvedOrderCannotBeRejectedException';
import { ShippedOrdersCannotBeChangedException } from '../useCase/shippedOrdersCannotBeChangedException';
import { TestOrderRepository } from './doubles/testOrderRepository';

describe('OrderApprovalUseCase', () => {
  let orderRepository: TestOrderRepository;
  let useCase: OrderApprovalUseCase;

  beforeEach(() => {
    orderRepository = new TestOrderRepository();
    useCase = new OrderApprovalUseCase(orderRepository);
  });

  it('approves an existing order', () => {
    orderRepository.addOrder(new Order(1, OrderStatus.Created));

    useCase.run(new OrderApprovalRequest(1, true));

    expect(orderRepository.getSavedOrder()!.status).toBe(OrderStatus.Approved);
  });

  it('rejects an existing order', () => {
    orderRepository.addOrder(new Order(1, OrderStatus.Created));

    useCase.run(new OrderApprovalRequest(1, false));

    expect(orderRepository.getSavedOrder()!.status).toBe(OrderStatus.Rejected);
  });

  it('cannot approve a rejected order', () => {
    orderRepository.addOrder(new Order(1, OrderStatus.Rejected));

    expect(() => useCase.run(new OrderApprovalRequest(1, true))).toThrow(
      RejectedOrderCannotBeApprovedException
    );
    expect(orderRepository.getSavedOrder()).toBeUndefined();
  });

  it('cannot reject an approved order', () => {
    orderRepository.addOrder(new Order(1, OrderStatus.Approved));

    expect(() => useCase.run(new OrderApprovalRequest(1, false))).toThrow(
      ApprovedOrderCannotBeRejectedException
    );
    expect(orderRepository.getSavedOrder()).toBeUndefined();
  });

  it('cannot reject a shipped order', () => {
    orderRepository.addOrder(new Order(1, OrderStatus.Shipped));

    expect(() => useCase.run(new OrderApprovalRequest(1, false))).toThrow(
      ShippedOrdersCannotBeChangedException
    );
    expect(orderRepository.getSavedOrder()).toBeUndefined();
  });
});
