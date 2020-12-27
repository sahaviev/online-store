import {
  render, remove, RenderPosition, replace,
} from '../utils/render.js';
import {SortingOrder, UpdateType} from '../const.js';

import {sortProducts, sortFavoriteProducts} from '../utils/product-sorters.js';
import {filterProducts} from '../utils/product-filters.js';

import {ProductItemPresenter} from './product-item-presenter.js';

import {ProductLayoutView} from '../view/product-layout-view.js';
import {SortingOrderView} from '../view/sorting-order-view.js';
import {SortingFavoritesView} from '../view/sorting-favorites-view.js';
import {NoProductsView} from '../view/no-products-view.js';
import {NoFavoritesView} from '../view/no-favorites-view.js';

const INITIAL_PRODUCTS_COUNT = 7;
const UPLOAD_PRODUCTS_COUNT = 5;

export class ProductListPresenter {
  constructor({
    appContainer,
    categoryModel,
    favoritesModel,
    filterModel,
    productsModel
  }) {
    this.appContainer = appContainer;
    this.categoryModel = categoryModel;
    this.favoritesModel = favoritesModel;
    this.filterModel = filterModel;
    this.productsModel = productsModel;

    this.productPresenters = {};

    this.selectedSortingOrder = SortingOrder.POPULAR;

    this.sortingOrderComponent = null;

    this.loadedProductsCount = 0;

    this.handleModelEvent = this.handleModelEvent.bind(this);
    this.handleFavoritesModelEvent = this.handleFavoritesModelEvent.bind(this);
    this.handleSortingOrderChange = this.handleSortingOrderChange.bind(this);
    this.handleShowFavorites = this.handleShowFavorites.bind(this);
    this.handleProductsScroll = this.handleProductsScroll.bind(this);
  }

  init() {
    this.productsLayoutComponent = new ProductLayoutView();
    this.productsLayoutComponent.setProductsScrollHandler(this.handleProductsScroll);
    render(this.appContainer, this.productsLayoutComponent);

    this.renderSortingOrder();

    this.sortingFavoritesComponent = new SortingFavoritesView();
    this.sortingFavoritesComponent.setShowFavoriteChangeHandler(this.handleShowFavorites);
    // eslint-disable-next-line max-len
    render(this.productsLayoutComponent.getSortingContainer(), this.sortingFavoritesComponent, RenderPosition.BEFOREEND);

    this.noProductsComponent = new NoProductsView();
    this.noFavoritesComponent = new NoFavoritesView();

    this.categoryModel.addSubscriber(this.handleModelEvent);
    this.filterModel.addSubscriber(this.handleModelEvent);
    this.productsModel.addSubscriber(this.handleModelEvent);
    this.favoritesModel.addSubscriber(this.handleFavoritesModelEvent);
  }

  renderSortingOrder() {
    const disabled = this.favoritesModel.getShowFavorites() === true;
    const previous = this.sortingOrderComponent;
    this.sortingOrderComponent = new SortingOrderView(disabled, this.selectedSortingOrder);
    this.sortingOrderComponent.setSortingOrderChangeHandler(this.handleSortingOrderChange);

    if (previous === null) {
      render(
          this.productsLayoutComponent.getSortingContainer(),
          this.sortingOrderComponent,
          RenderPosition.BEFOREEND,
      );
      return;
    }

    replace(this.sortingOrderComponent, previous);
    remove(previous);
  }

  handleSortingOrderChange(sortingOrder) {
    this.selectedSortingOrder = sortingOrder;
    this.renderProductList();
  }

  handleShowFavorites(show) {
    this.favoritesModel.setShowFavorites(UpdateType.MAJOR, show);
  }

  handleFavoritesModelEvent() {
    this.renderSortingOrder();
    this.renderProductList();
  }

  handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.MINOR: {
        this.productPresenters[data.id].init(data);
        break;
      }
      default: {
        this.renderProductList();
      }
    }
  }

  handleProductsScroll() {
    const products = this.getProducts();

    if (this.loadedProductsCount < products.length) {
      this.renderProducts(
          products.slice(this.loadedProductsCount, this.loadedProductsCount + UPLOAD_PRODUCTS_COUNT),
      );
      this.loadedProductsCount += UPLOAD_PRODUCTS_COUNT;
    }
  }

  getProducts() {
    const products = this.productsModel.getProducts();

    if (this.favoritesModel.getShowFavorites()) {
      const favoriteProducts = sortFavoriteProducts(products);
      return sortProducts(favoriteProducts, this.selectedSortingOrder);
    }

    const currentCategory = this.categoryModel.getCategory();
    const currentFilters = this.filterModel.getFilters();

    const filteredProducts = filterProducts(products, currentCategory, currentFilters);

    return sortProducts(filteredProducts, this.selectedSortingOrder);
  }

  clearProducts() {
    Object
      .values(this.productPresenters)
      .forEach((presenter) => presenter.destroy());
    this.productPresenters = {};

    remove(this.noProductsComponent);
    remove(this.noFavoritesComponent);
  }

  renderProducts(products) {
    products.forEach((task) => this.renderProduct(task));
  }

  renderProduct(product) {
    // eslint-disable-next-line max-len
    const productPresenter = new ProductItemPresenter(this.appContainer, this.productsLayoutComponent.getProductListContainer(), this.productsModel);
    productPresenter.init(product);
    this.productPresenters[product.id] = productPresenter;
  }

  renderNoProducts() {
    render(
        this.productsLayoutComponent.getProductListContainer(),
        this.noProductsComponent,
        RenderPosition.AFTERBEGIN,
    );
  }

  renderNoFavorites() {
    render(
        this.productsLayoutComponent.getProductListContainer(),
        this.noFavoritesComponent,
        RenderPosition.AFTERBEGIN,
    );
  }

  renderProductList() {
    this.clearProducts();
    const showFavorites = this.favoritesModel.getShowFavorites();
    const products = this.getProducts();

    if (!showFavorites && products.length === 0) {
      this.renderNoProducts();
      return;
    }

    if (showFavorites && products.length === 0) {
      this.renderNoFavorites();
      return;
    }

    this.renderProducts(products.slice(0, INITIAL_PRODUCTS_COUNT));
    this.loadedProductsCount = INITIAL_PRODUCTS_COUNT;
  }
}
