import { OrderRepository } from '../repository/orderRepository';
import { OrderStatus } from '../domain/orderStatus';
import { OrderApprovalRequest } from './orderApprovalRequest';
import { ShippedOrdersCannotBeChangedException } from './shippedOrdersCannotBeChangedException';
import { RejectedOrderCannotBeApprovedException } from './rejectedOrderCannotBeApprovedException';
import { ApprovedOrderCannotBeRejectedException } from './approvedOrderCannotBeRejectedException';

export class OrderApprovalUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  run(request: OrderApprovalRequest): void {
    const order = this.orderRepository.getById(request.orderId)!;

    if (order.status === OrderStatus.Shipped) {
      throw new ShippedOrdersCannotBeChangedException();
    }

    if (request.approved && order.status === OrderStatus.Rejected) {
      throw new RejectedOrderCannotBeApprovedException();
    }

    if (!request.approved && order.status === OrderStatus.Approved) {
      throw new ApprovedOrderCannotBeRejectedException();
    }

    order.status = request.approved ? OrderStatus.Approved : OrderStatus.Rejected;
    this.orderRepository.save(order);
  }
}
