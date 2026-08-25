import { OrderItem } from './orderItem';
import { OrderStatus } from './orderStatus';

export class Order {
  id: number;
  status: OrderStatus;
  currency: string;
  items: OrderItem[];
  total: number;
  tax: number;

  constructor(
    id: number,
    status: OrderStatus,
    currency = '',
    items: OrderItem[] = [],
    total = 0,
    tax = 0
  ) {
    this.id = id;
    this.status = status;
    this.currency = currency;
    this.items = items;
    this.total = total;
    this.tax = tax;
  }
}
