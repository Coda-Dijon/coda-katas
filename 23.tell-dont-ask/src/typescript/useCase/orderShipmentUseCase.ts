import { OrderRepository } from '../repository/orderRepository';
import { ShipmentService } from '../service/shipmentService';
import { OrderStatus } from '../domain/orderStatus';
import { OrderShipmentRequest } from './orderShipmentRequest';
import { OrderCannotBeShippedException } from './orderCannotBeShippedException';
import { OrderCannotBeShippedTwiceException } from './orderCannotBeShippedTwiceException';

export class OrderShipmentUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly shipmentService: ShipmentService
  ) {}

  run(request: OrderShipmentRequest): void {
    const order = this.orderRepository.getById(request.orderId)!;

    if (order.status === OrderStatus.Created || order.status === OrderStatus.Rejected) {
      throw new OrderCannotBeShippedException();
    }

    if (order.status === OrderStatus.Shipped) {
      throw new OrderCannotBeShippedTwiceException();
    }

    this.shipmentService.ship(order);

    order.status = OrderStatus.Shipped;
    this.orderRepository.save(order);
  }
}
