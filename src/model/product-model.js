import { AbstractModel } from '../utils/abstract-model';

export class ProductModel extends AbstractModel {
  constructor() {
    super();
    this.products = [];
  }

  setProducts(updateType, products) {
    this.products = products.slice();

    this.observer.notify(updateType, products);
  }

  getProducts() {
    return this.products;
  }
}
