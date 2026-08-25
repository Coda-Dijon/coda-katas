import { describe, it, expect, beforeEach } from 'vitest';
import { Category } from '../domain/category';
import { Product } from '../domain/product';
import { OrderStatus } from '../domain/orderStatus';
import { OrderCreationUseCase } from '../useCase/orderCreationUseCase';
import { UnknownProductException } from '../useCase/unknownProductException';
import { InMemoryProductCatalog } from './doubles/inMemoryProductCatalog';
import { TestOrderRepository } from './doubles/testOrderRepository';

describe('OrderCreationUseCase', () => {
  let orderRepository: TestOrderRepository;
  let useCase: OrderCreationUseCase;

  beforeEach(() => {
    const food = new Category('food', 10);
    const productCatalog = new InMemoryProductCatalog([
      new Product('salad', 3.56, food),
      new Product('tomato', 4.65, food),
    ]);

    orderRepository = new TestOrderRepository();
    useCase = new OrderCreationUseCase(orderRepository, productCatalog);
  });

  it('sells multiple items', () => {
    useCase.run('john doe', { salad: 2, tomato: 3 });

    const insertedOrder = orderRepository.getSavedOrder()!;
    expect(insertedOrder.status).toBe(OrderStatus.Created);
    expect(insertedOrder.total).toBe(23.2);
    expect(insertedOrder.tax).toBe(2.13);
    expect(insertedOrder.currency).toBe('EUR');
    expect(insertedOrder.items).toHaveLength(2);

    expect(insertedOrder.items[0].product.name).toBe('salad');
    expect(insertedOrder.items[0].product.price).toBe(3.56);
    expect(insertedOrder.items[0].quantity).toBe(2);
    expect(insertedOrder.items[0].taxedAmount).toBe(7.84);
    expect(insertedOrder.items[0].tax).toBe(0.72);

    expect(insertedOrder.items[1].product.name).toBe('tomato');
    expect(insertedOrder.items[1].product.price).toBe(4.65);
    expect(insertedOrder.items[1].quantity).toBe(3);
    expect(insertedOrder.items[1].taxedAmount).toBe(15.36);
    expect(insertedOrder.items[1].tax).toBe(1.41);
  });

  it('throws for an unknown product', () => {
    expect(() => useCase.run('john doe', { 'unknown product': 0 })).toThrow(
      UnknownProductException
    );
  });
});
