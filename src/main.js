import { Api } from './api';
import { UpdateType } from './const';
import { render } from './utils/render';

import { CategoryModel } from './model/category-model';
import { FavoritesModel } from './model/favorites-model';
import { FilterModel } from './model/filter-model';
import { ProductModel } from './model/product-model';

import { CategoriesPresenter } from './presenter/categories-presenter';
import { FiltersPresenter } from './presenter/filters-presenter';
import { ProductListPresenter } from './presenter/product-list-presenter';

import { SidebarView } from './view/sidebar-view';

const END_POINT = 'https://main-shop-fake-server.herokuapp.com';

const api = new Api(END_POINT);

const categoryModel = new CategoryModel();
const filterModel = new FilterModel();
const productsModel = new ProductModel();
const favoritesModel = new FavoritesModel();

const mainContainer = document.querySelector('.main');
const appContainer = mainContainer.querySelector('.onlineshop-app__wrapper');

const sidebarComponent = new SidebarView();
render(appContainer, sidebarComponent);

const categoryPresenter = new CategoriesPresenter(sidebarComponent, categoryModel, favoritesModel);
const filterPresenter = new FiltersPresenter(
  sidebarComponent, categoryModel, favoritesModel, filterModel,
);
const productPresenter = new ProductListPresenter(
  appContainer, categoryModel, favoritesModel, filterModel, productsModel,
);

categoryPresenter.init();
filterPresenter.init();
productPresenter.init();

api.getProducts()
  .then((data) => {
    productsModel.setProducts(UpdateType.INIT, data.products.map(ProductModel.adaptToClient));
  });
