import { OrderRepository } from '../repository/orderRepository';
import { ProductCatalog } from '../repository/productCatalog';
import { Order } from '../domain/order';
import { OrderItem } from '../domain/orderItem';
import { OrderStatus } from '../domain/orderStatus';
import { UnknownProductException } from './unknownProductException';

export class OrderCreationUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productCatalog: ProductCatalog
  ) {}

  run(clientId: string, items: Record<string, number>): void {
    const order = new Order(0, OrderStatus.Created, 'EUR', [], 0, 0);

    for (const productName of Object.keys(items)) {
      const product = this.productCatalog.getByName(productName);

      if (!product) {
        throw new UnknownProductException();
      } else {
        const quantity = items[productName];
        const unitaryTax = round((product.price / 100) * product.category.taxPercentage);
        const unitaryTaxedAmount = round(product.price + unitaryTax);
        const taxedAmount = round(unitaryTaxedAmount * quantity);
        const taxAmount = round(unitaryTax * quantity);

        const orderItem = new OrderItem(product, quantity, taxedAmount, taxAmount);
        order.items.push(orderItem);
        order.total = round(order.total + taxedAmount);
        order.tax = round(order.tax + taxAmount);
      }
    }

    this.orderRepository.save(order);
  }
}

function round(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}
