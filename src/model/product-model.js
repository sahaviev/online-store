import { AbstractModel } from '../utils/abstract-model';
import { adaptDate } from '../utils/product';

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
      date: adaptDate(product['data publishing']),
    };
  }
}
