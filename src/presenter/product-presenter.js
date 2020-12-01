import {
  remove, render, replace, RenderPosition,
} from '../utils/render';
import { sortByDate, sortByPrice } from '../utils/product';

import { SortingOrder } from '../const';

import { ProductView } from '../view/product-view';
import { ProductListView } from '../view/product-list-view';
import { SortingOrderView } from '../view/sorting-order-view';
import { SortingFavoritesView } from '../view/sorting-favorites-view';

export class ProductPresenter {
  constructor(appContainer, productsModel) {
    this.appContainer = appContainer;
    this.productsModel = productsModel;

    this.currentSortingOrder = null;

    this.handleModelEvent = this.handleModelEvent.bind(this);
    this.handleSortingOrderChange = this.handleSortingOrderChange.bind(this);
  }

  init() {
    const products = this.productsModel.getProducts();

    this.productsContainer = new ProductView();
    this.sortingOrderComponent = new SortingOrderView();
    this.sortingFavoritesComponent = new SortingFavoritesView();
    this.productListComponent = new ProductListView(products);

    const sortingContainer = this.productsContainer.getSortingContainer();

    this.sortingOrderComponent.setSortingOrderChangeHandler(this.handleSortingOrderChange);

    render(sortingContainer, this.sortingOrderComponent, RenderPosition.BEFOREEND);
    render(sortingContainer, this.sortingFavoritesComponent, RenderPosition.BEFOREEND);
    render(this.productsContainer.getProductListContainer(), this.productListComponent);
    render(this.appContainer, this.productsContainer);

    this.productsModel.addSubscriber(this.handleModelEvent);
  }

  handleSortingOrderChange(sortingOrder) {
    this.currentSortingOrder = sortingOrder;
    this.renderProducts();
  }

  handleModelEvent(products) {
    this.renderProducts(products);
  }

  getProducts() {
    const products = this.productsModel.getProducts();

    switch (this.currentSortingOrder) {
      case SortingOrder.CHEAP:
        return products.slice().sort(sortByPrice);
      case SortingOrder.NEW:
        return products.slice().sort(sortByDate);
      default:
        return products;
    }
  }

  renderProducts() {
    const products = this.getProducts();

    const previous = this.productListComponent;
    this.productListComponent = new ProductListView(products);

    replace(this.productListComponent, previous);
    remove(previous);
  }
}
