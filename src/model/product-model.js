import { AbstractModel } from './abstract-model';
import { adaptCategory, adaptDate } from '../utils/product-adapters';

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

  updateProduct(updateType, newProduct) {
    const index = this.products.findIndex((product) => product.id === newProduct.id);

    if (index === -1) {
      throw new Error('Can\'t update non-existent product');
    }

    this.products = [
      ...this.products.slice(0, index),
      newProduct,
      ...this.products.slice(index + 1),
    ];

    this.observer.notify(updateType, newProduct);
  }

  static adaptToClient(product, index) {
    return {
      ...product,
      id: index + 1,
      category: adaptCategory(product.category),
      date: adaptDate(product['data publishing']),
    };
  }
}
