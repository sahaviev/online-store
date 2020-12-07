import { Api } from './api';
import { UpdateType } from './const';

import { CategoryModel } from './model/category-model';
import { FilterModel } from './model/filter-model';
import { ProductModel } from './model/product-model';

import { FilterPresenter } from './presenter/filter-presenter';
import { ProductListPresenter } from './presenter/product-list-presenter';

const END_POINT = 'https://main-shop-fake-server.herokuapp.com';

const api = new Api(END_POINT);

const categoryModel = new CategoryModel();
const filterModel = new FilterModel();
const productsModel = new ProductModel();

const mainContainer = document.querySelector('.main');
const appContainer = mainContainer.querySelector('.onlineshop-app__wrapper');

const filterPresenter = new FilterPresenter(appContainer, categoryModel, filterModel);
const productPresenter = new ProductListPresenter(
  appContainer, categoryModel, filterModel, productsModel,
);

filterPresenter.init();
productPresenter.init();

api.getProducts()
  .then((data) => {
    productsModel.setProducts(UpdateType.INIT, data.products.map(ProductModel.adaptToClient));
  });
