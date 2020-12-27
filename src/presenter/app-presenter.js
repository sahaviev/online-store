import {UpdateType} from '../const.js';
import {render} from '../utils/render.js';

import {CategoriesPresenter} from './categories-presenter.js';
import {FiltersPresenter} from './filters-presenter.js';
import {ProductListPresenter} from './product-list-presenter.js';

import {CategoryModel} from '../model/category-model.js';
import {FilterModel} from '../model/filter-model.js';
import {ProductModel} from '../model/product-model.js';
import {FavoritesModel} from '../model/favorites-model.js';

import {AppView} from '../view/app-view.js';
import {SidebarView} from '../view/sidebar-view.js';

export class AppPresenter {
  constructor(mainContainer, api) {
    this.mainContainer = mainContainer;
    this.api = api;

    this.categoryModel = new CategoryModel();
    this.filterModel = new FilterModel();
    this.productsModel = new ProductModel();
    this.favoritesModel = new FavoritesModel();

    this.appComponent = null;
    this.sidebarComponent = null;
  }

  init() {
    this.appComponent = new AppView();
    render(this.mainContainer, this.appComponent);

    this.sidebarComponent = new SidebarView();
    render(this.appComponent.getAppContainer(), this.sidebarComponent);

    this.categoryPresenter = new CategoriesPresenter(
        this.sidebarComponent.getCategoriesContainer(),
        this.categoryModel,
        this.favoritesModel,
    );

    this.filterPresenter = new FiltersPresenter({
      filtersContainer: this.sidebarComponent.getCategoryFiltersContainer(),
      categoryModel: this.categoryModel,
      favoritesModel: this.favoritesModel,
      filterModel: this.filterModel,
      productsModel: this.productsModel,
    });

    this.productPresenter = new ProductListPresenter({
      appContainer: this.appComponent.getAppContainer(),
      categoryModel: this.categoryModel,
      favoritesModel: this.favoritesModel,
      filterModel: this.filterModel,
      productsModel: this.productsModel,
    });

    this.categoryPresenter.init();
    this.filterPresenter.init();
    this.productPresenter.init();

    this.api.getProducts()
      .then((data) => {
        const products = this.productsModel.adaptToClient(data.products);
        this.productsModel.setProducts(UpdateType.INIT, products);
      });
  }
}
