import { Product } from '../../domain/product';
import { ProductCatalog } from '../../repository/productCatalog';

export class InMemoryProductCatalog implements ProductCatalog {
  constructor(private readonly products: Product[]) {}

  getByName(name: string): Product | undefined {
    return this.products.find((p) => p.name === name);
  }
}
