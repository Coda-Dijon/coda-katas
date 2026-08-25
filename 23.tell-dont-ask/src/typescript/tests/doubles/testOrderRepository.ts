import { Order } from '../../domain/order';
import { OrderRepository } from '../../repository/orderRepository';

export class TestOrderRepository implements OrderRepository {
  private insertedOrder: Order | undefined;
  private readonly orders: Order[] = [];

  save(order: Order): void {
    this.insertedOrder = order;
  }

  getById(orderId: number): Order | undefined {
    return this.orders.find((o) => o.id === orderId);
  }

  getSavedOrder(): Order | undefined {
    return this.insertedOrder;
  }

  addOrder(order: Order): void {
    this.orders.push(order);
  }
}
