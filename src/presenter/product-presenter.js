import {
  remove, render, replace, RenderPosition,
} from '../utils/render';

import { sortProducts } from '../utils/product-sorters';
import { filterProducts } from '../utils/product-filters';

import { ProductView } from '../view/product-view';
import { ProductListView } from '../view/product-list-view';
import { SortingOrderView } from '../view/sorting-order-view';
import { SortingFavoritesView } from '../view/sorting-favorites-view';

export class ProductPresenter {
  constructor(appContainer, categoryModel, filterModel, productsModel) {
    this.appContainer = appContainer;
    this.categoryModel = categoryModel;
    this.filterModel = filterModel;
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

    this.categoryModel.addSubscriber(this.handleModelEvent);
    this.filterModel.addSubscriber(this.handleModelEvent);
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
    const currentCategory = this.categoryModel.getCategory();
    const currentFilters = this.filterModel.getFilters();

    const filtered = filterProducts(products, currentCategory, currentFilters);
    console.log(currentFilters);

    console.log(filtered);

    return sortProducts(filtered, this.currentSortingOrder);
  }

  renderProducts() {
    const products = this.getProducts();

    const previous = this.productListComponent;
    this.productListComponent = new ProductListView(products);

    replace(this.productListComponent, previous);
    remove(previous);
  }
}
