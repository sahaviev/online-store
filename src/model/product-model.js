import { AbstractModel } from './abstract-model';
import { adaptCategory, adaptDate } from '../utils/product-adapters';

export class ProductModel extends AbstractModel {
  constructor() {
    super();
    this.products = [];
  }

  setProducts(updateType, products) {
    console.log(products);
    this.products = products.slice();

    this.observer.notify(updateType, products);
  }

  getProducts() {
    return this.products;
  }

  static adaptToClient(product) {
    return {
      ...product,
      category: adaptCategory(product.category),
      date: adaptDate(product['data publishing']),
    };
  }
}
