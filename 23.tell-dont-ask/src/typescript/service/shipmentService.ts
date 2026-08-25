import { Order } from '../domain/order';

export interface ShipmentService {
  ship(order: Order): void;
}
