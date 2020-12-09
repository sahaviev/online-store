import {
  render, remove, RenderPosition, replace,
} from '../utils/render';
import { UpdateType } from '../const';

import { sortProducts, sortFavoriteProducts } from '../utils/product-sorters';
import { filterProducts } from '../utils/product-filters';

import { ProductItemPresenter } from './product-item-presenter';

import { ProductLayoutView } from '../view/product-layout-view';
import { SortingOrderView } from '../view/sorting-order-view';
import { SortingFavoritesView } from '../view/sorting-favorites-view';
import { NoProductsView } from '../view/no-products-view';
import { NoFavouritesView } from '../view/no-favourites-view';

const FIRST_RENDER_ITEMS_COUNT = 5;

export class ProductListPresenter {
  constructor(appContainer, categoryModel, favoritesModel, filterModel, productsModel) {
    this.appContainer = appContainer;
    this.categoryModel = categoryModel;
    this.favoritesModel = favoritesModel;
    this.filterModel = filterModel;
    this.productsModel = productsModel;

    this.productPresenters = {};

    this.currentSortingOrder = null;

    this.handleModelEvent = this.handleModelEvent.bind(this);
    this.handleFavoritesModelEvent = this.handleFavoritesModelEvent.bind(this);
    this.handleSortingOrderChange = this.handleSortingOrderChange.bind(this);
    this.handleShowFavorites = this.handleShowFavorites.bind(this);
  }

  init() {
    const disabled = this.favoritesModel.getShowFavorites() === true;
    this.productsLayoutComponent = new ProductLayoutView();
    this.sortingOrderComponent = new SortingOrderView(disabled);
    this.sortingFavoritesComponent = new SortingFavoritesView();
    this.noProductsComponent = new NoProductsView();
    this.noFavouritesComponent = new NoFavouritesView();

    const sortingContainer = this.productsLayoutComponent.getSortingContainer();

    this.sortingOrderComponent.setSortingOrderChangeHandler(this.handleSortingOrderChange);
    this.sortingFavoritesComponent.setShowFavoriteClickHandler(this.handleShowFavorites);

    render(sortingContainer, this.sortingOrderComponent, RenderPosition.BEFOREEND);
    render(sortingContainer, this.sortingFavoritesComponent, RenderPosition.BEFOREEND);
    render(this.appContainer, this.productsLayoutComponent);

    this.categoryModel.addSubscriber(this.handleModelEvent);
    this.filterModel.addSubscriber(this.handleModelEvent);
    this.productsModel.addSubscriber(this.handleModelEvent);
    this.favoritesModel.addSubscriber(this.handleFavoritesModelEvent);
  }

  handleSortingOrderChange(sortingOrder) {
    this.currentSortingOrder = sortingOrder;
    this.renderProductList();
  }

  handleShowFavorites(show) {
    this.favoritesModel.setShowFavorites(UpdateType.MAJOR, show);
  }

  handleFavoritesModelEvent() {
    const disabled = this.favoritesModel.getShowFavorites() === true;

    const previous = this.sortingOrderComponent;
    this.sortingOrderComponent = new SortingOrderView(disabled);
    this.sortingOrderComponent.setSortingOrderChangeHandler(this.handleSortingOrderChange);

    replace(this.sortingOrderComponent, previous);
    remove(previous);
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

  getProducts() {
    const products = this.productsModel.getProducts();

    if (this.favoritesModel.getShowFavorites()) {
      const favoriteProducts = sortFavoriteProducts(products);
      return sortProducts(favoriteProducts, this.currentSortingOrder);
    }

    const currentCategory = this.categoryModel.getCategory();
    const currentFilters = this.filterModel.getFilters();

    const filteredProducts = filterProducts(products, currentCategory, currentFilters);

    return sortProducts(filteredProducts, this.currentSortingOrder);
  }

  clearProducts() {
    Object
      .values(this.productPresenters)
      .forEach((presenter) => presenter.destroy());
    this.productPresenters = {};

    remove(this.noProductsComponent);
    remove(this.noFavouritesComponent);
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

  renderNoFavourites() {
    render(
      this.productsLayoutComponent.getProductListContainer(),
      this.noFavouritesComponent,
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
      this.renderNoFavourites();
      return;
    }

    this.renderProducts(products.slice(0, FIRST_RENDER_ITEMS_COUNT));
  }
}
