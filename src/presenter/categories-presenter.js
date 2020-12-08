import {remove, render, replace} from '../utils/render';
import { categories, UpdateType } from '../const';

import { CategoriesView } from '../view/categories-view';

export class CategoriesPresenter {
  constructor(sidebarComponent, categoryModel, favoritesModel) {
    this.sidebarComponent = sidebarComponent;
    this.categoryModel = categoryModel;
    this.favoritesModel = favoritesModel;

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleModelEvent = this.handleModelEvent.bind(this);

    this.favoritesModel.addSubscriber(this.handleModelEvent);
  }

  init() {
    this.currentCategory = this.categoryModel.getCategory();
    const disabled = this.favoritesModel.getShowFavorites() === true;

    this.categoriesComponent = new CategoriesView(categories, disabled);

    render(this.sidebarComponent.getCategoriesContainer(), this.categoriesComponent);

    this.categoriesComponent.setCategoryChangeHandler(this.handleCategoryChange);
  }

  renderCategories() {
    const disabled = this.favoritesModel.getShowFavorites() === true;

    const previous = this.categoriesComponent;
    this.categoriesComponent = new CategoriesView(categories, disabled);
    this.categoriesComponent.setCategoryChangeHandler(this.handleCategoryChange);

    replace(this.categoriesComponent, previous);
    remove(previous);
  }

  handleModelEvent() {
    this.renderCategories();
  }

  handleCategoryChange(category) {
    if (this.currentCategory === category) {
      return;
    }

    this.currentCategory = category;
    this.categoryModel.setCategory(UpdateType.MAJOR, category);
  }
}
