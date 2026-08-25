import { Product } from './product';

export class OrderItem {
  product: Product;
  quantity: number;
  taxedAmount: number;
  tax: number;

  constructor(product: Product, quantity: number, taxedAmount: number, tax: number) {
    this.product = product;
    this.quantity = quantity;
    this.taxedAmount = taxedAmount;
    this.tax = tax;
  }
}
