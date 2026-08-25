import { Order } from '../../domain/order';
import { ShipmentService } from '../../service/shipmentService';

export class TestShipmentService implements ShipmentService {
  private shippedOrder: Order | undefined;

  ship(order: Order): void {
    this.shippedOrder = order;
  }

  getShippedOrder(): Order | undefined {
    return this.shippedOrder;
  }
}
