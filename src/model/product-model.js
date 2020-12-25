import { LocalStorageWrapper } from '../utils/localstorage-wrapper';
import {
  adaptCategory, adaptDate, formatPrice, getPublishDateDifference, getPublishDateString,
} from '../utils/product-adapters';
import { UpdateType } from '../const';

import { AbstractModel } from './abstract-model';

export class ProductModel extends AbstractModel {
  constructor() {
    super();
    this.products = [];
    this.favoritesStorage = new LocalStorageWrapper('favorites');
  }

  setProducts(updateType, products) {
    this.products = products.slice();

    this.observer.notify(updateType, products);
  }

  getProducts() {
    return this.products;
  }

  setFavorite(product, favorite) {
    this.favoritesStorage.save(product.id, favorite);

    this.updateProduct(UpdateType.MINOR,
      {
        ...product,
        is_favorite: favorite,
      });
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

  // ToDo: запросить возврат id со стороны сервера
  adaptToClient(products) {
    return products.map((product, index) => {
      const date = adaptDate(product['publish-date']);
      return {
        ...product,
        id: index + 1,
        is_favorite: this.favoritesStorage.fetch(index + 1),
        date,
        category: adaptCategory(product.category),
        'formatted-price': formatPrice(product.price),
        dateString: getPublishDateString(date),
        dateDifference: getPublishDateDifference(date),
      };
    });
  }
}
