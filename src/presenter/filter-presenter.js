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

  handleFilterChange(filter) {
    // ToDo: порефачить. нужно написать декларативно и более просто
    // ToDo: порефачить. checkbox нужно проверять из const, как минимум
    switch (filter.type) {
      case 'checkbox': {
        if (!this.filters[filter.name]) {
          this.filters[filter.name] = [];
        }
        if (filter.checked) {
          this.filters[filter.name].push(filter.value);
        }
        if (!filter.checked) {
          this.filters[filter.name] = this.filters[filter.name].filter(
            (item) => item !== filter.value,
          );
        }
        break;
      }
      default: {
        this.filters[filter.name] = filter.value;
      }
    }
  }

  handleFilterButtonClick() {
    this.filterModel.setFilters(UpdateType.MAJOR, this.filters);
  }

  handleModelEvent() {
    this.updateCategoryFilters();
  }
}
