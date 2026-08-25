import { Product } from '../domain/product';

export interface ProductCatalog {
  getByName(name: string): Product | undefined;
}
