import { UpdateType } from '../const';
import { render } from '../utils/render';

import { CategoriesPresenter } from './categories-presenter';
import { FiltersPresenter } from './filters-presenter';
import { ProductListPresenter } from './product-list-presenter';

import { CategoryModel } from '../model/category-model';
import { FilterModel } from '../model/filter-model';
import { ProductModel } from '../model/product-model';
import { FavoritesModel } from '../model/favorites-model';

import { AppView } from '../view/app-view';
import { SidebarView } from '../view/sidebar-view';

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

    this.filterPresenter = new FiltersPresenter(
      this.sidebarComponent.getCategoryFiltersContainer(),
      this.categoryModel,
      this.favoritesModel,
      this.filterModel,
      this.productsModel,
    );

    this.productPresenter = new ProductListPresenter(
      this.appComponent.getAppContainer(),
      this.categoryModel,
      this.favoritesModel,
      this.filterModel,
      this.productsModel,
    );

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
