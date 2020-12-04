import { remove, render, replace } from '../utils/render';
import { categories, CategoryType, UpdateType } from '../const';

import { FilterView } from '../view/filter-view';
import { CategoriesView } from '../view/categories-view';
import { FilterRangeView } from '../view/filter-range-view';
import { FilterEstateView } from '../view/filter-estate-view';
import { FilterLaptopView } from '../view/filter-laptop-view';
import { FilterCameraView } from '../view/filter-camera-view';
import { FilterCarsView } from '../view/filter-cars-view';

const getCategoryFilterView = (category) => {
  switch (category) {
    case CategoryType.ALL:
      return new FilterRangeView();
    case CategoryType.ESTATE:
      return new FilterEstateView();
    case CategoryType.LAPTOPS:
      return new FilterLaptopView();
    case CategoryType.CAMERA:
      return new FilterCameraView();
    case CategoryType.CARS:
      return new FilterCarsView();
    default:
      return new FilterRangeView();
  }
};

export class FilterPresenter {
  constructor(appContainer, categoryModel, filterModel) {
    this.appContainer = appContainer;
    this.categoryModel = categoryModel;
    this.filterModel = filterModel;
    this.filters = {};

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleModelEvent = this.handleModelEvent.bind(this);
    this.handleFilterButtonClick = this.handleFilterButtonClick.bind(this);
    this.handlerCheckboxFilterChange = this.handlerCheckboxFilterChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  init() {
    this.currentCategory = this.categoryModel.getCategory();

    this.filterContainer = new FilterView();
    this.categoriesComponent = new CategoriesView(categories);
    this.categoryFiltersComponent = getCategoryFilterView(this.currentCategory);

    render(this.filterContainer.getCategoriesContainer(), this.categoriesComponent);
    render(this.filterContainer.getCategoryFiltersContainer(), this.categoryFiltersComponent);
    render(this.appContainer, this.filterContainer);

    this.filterContainer.setFilterButtonClickHandler(this.handleFilterButtonClick);
    this.categoriesComponent.setCategoryChangeHandler(this.handleCategoryChange);
    this.categoryModel.addSubscriber(this.handleModelEvent);
  }

  updateCategoryFilters() {
    this.currentCategory = this.categoryModel.getCategory();

    const previous = this.categoryFiltersComponent;
    this.categoryFiltersComponent = getCategoryFilterView(this.currentCategory);
    this.categoryFiltersComponent.setCheckboxFilterChangeHandler(this.handlerCheckboxFilterChange);
    this.categoryFiltersComponent.setFilterChangeHandler(this.handleFilterChange);

    this.filters = {};

    replace(this.categoryFiltersComponent, previous);
    remove(previous);
  }

  handleCategoryChange(category) {
    if (this.currentCategory === category) {
      return;
    }

    this.categoryModel.setCategory(UpdateType.MAJOR, category);
  }

  handlerCheckboxFilterChange(name, value, checked) {
    if (!this.filters[name]) {
      this.filters[name] = [];
    }
    if (checked) {
      this.filters[name].push(value);
    }
    if (!checked) {
      this.filters[name] = this.filters[name].filter(
        (item) => item !== value,
      );
    }
  }

  handleFilterChange(name, value) {
    this.filters[name] = value;
  }

  handleFilterButtonClick() {
    this.filterModel.setFilters(UpdateType.MAJOR, this.filters);
  }

  handleModelEvent() {
    this.updateCategoryFilters();
  }
}
