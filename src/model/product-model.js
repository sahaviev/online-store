import {LocalStorageWrapper} from '../utils/localstorage-wrapper.js';
import {adaptCategory, formatPrice} from '../utils/product-adapters.js';
import {convertStringTimestampToDate, getPublishDateDifference, getPublishDateString} from '../utils/date.js';

import {UpdateType} from '../const.js';

import {AbstractModel} from './abstract-model.js';

export class ProductModel extends AbstractModel {
  constructor() {
    super();
    this.products = [];
    this.favoritesStorage = new LocalStorageWrapper(`favorites`);
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
          isFavorite: favorite,
        });
  }

  updateProduct(updateType, newProduct) {
    const index = this.products.findIndex((product) => product.id === newProduct.id);

    if (index === -1) {
      throw new Error(`Can't update non-existent product`);
    }

    this.products = [
      ...this.products.slice(0, index),
      newProduct,
      ...this.products.slice(index + 1),
    ];

    this.observer.notify(updateType, newProduct);
  }

  adaptToClient(products) {
    return products.map((product, index) => {
      const date = convertStringTimestampToDate(product[`publish-date`]);
      return {
        ...product,
        'id': index + 1,
        'isFavorite': this.favoritesStorage.fetch(index + 1),
        'category': adaptCategory(product.category),
        'formatted-price': formatPrice(product.price),
        'dateString': getPublishDateString(date),
        'dateDifference': getPublishDateDifference(date),
        date,
      };
    });
  }
}
