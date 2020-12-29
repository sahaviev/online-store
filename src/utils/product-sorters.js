import {SortingOrder} from '../const.js';

const sortByPrice = (product1, product2) => product1.price - product2.price;

const sortByDate = (product1, product2) => product2.date - product1.date;

export const sortProducts = (products, sortingOrder) => {
  switch (sortingOrder) {
    case SortingOrder.CHEAP:
      return products.slice().sort(sortByPrice);
    case SortingOrder.NEW:
      return products.slice().sort(sortByDate);
    default:
      return products;
  }
};

export const sortFavoriteProducts = (products) => products.filter((product) => product.isFavorite);
