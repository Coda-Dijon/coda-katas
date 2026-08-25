import { Order } from '../domain/order';

export interface OrderRepository {
  save(order: Order): void;

  getById(orderId: number): Order | undefined;
}
