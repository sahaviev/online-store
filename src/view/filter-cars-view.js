import {AbstractFilterView} from './abstract-filter-view.js';

const years = [
  `1950`,
  `2000`,
  `2010`,
  `2015`,
  `2016`,
  `2017`,
  `2018`,
  `2019`,
  `2020`,
];

const createSelectOptions = (items, selected) => items
  .map((item) => (
    `<option value="${item}" ${item === selected ? `selected` : ``}>${item}</option>`
  ))
  .join(``);

const createCarFilterTemplate = (disabled = ``, selectedFilters = {}) => `<div class="filter__car">
    <div class="filter__select-wrapper">
      <label for="production-year">Минимальный год выпуска</label>
      <select id="production-year" name="production-year" ${disabled}>
        <option value="any">Любой</option>
        ${createSelectOptions(years, selectedFilters[`production-year`])}
      </select>
      <svg width="14" height="8" viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" />
      </svg>
    </div>
    <fieldset class="filter__radiobuttons filter__radiobuttons--transmission">
      <legend>Коробка передач</legend>
      <ul class="filter__radiobuttons-list" id="gearbox-type">
        <li class="filter__radiobuttons-item">
          <input class="visually-hidden" type="radio" name="transmission" value="any" id="any_gearbox"
              ${disabled}
              ${selectedFilters.transmission && selectedFilters.transmission.includes(`any`) ? `checked` : ``}
          />
          <label for="any_gearbox">Любая</label>
        </li>
        <li class="filter__radiobuttons-item">
          <input class="visually-hidden" type="radio" name="transmission" value="mechanic" id="mechanic_gearbox"
            ${disabled}
            ${selectedFilters.transmission && selectedFilters.transmission.includes(`mechanic`) ? `checked` : ``}
          />
          <label for="mechanic_gearbox">Механика</label>
        </li>
        <li class="filter__radiobuttons-item">
          <input class="visually-hidden" type="radio" name="transmission" value="auto" id="auto_gearbox"
            ${disabled}
            ${selectedFilters.transmission && selectedFilters.transmission.includes(`auto`) ? `checked` : ``}
          />
          <label for="auto_gearbox">Автомат</label>
        </li>
      </ul>
    </fieldset>
    <fieldset class="filter__type filter__type--car-body">
      <legend>Тип кузова</legend>
      <ul class="filter__checkboxes-list filter__checkboxes-list--car-body" id="body-type">
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="body-type" value="sedan" id="sedan"
            ${disabled}
            ${selectedFilters[`body-type`] && selectedFilters[`body-type`].includes(`sedan`) ? `checked` : ``}
          />
          <label for="sedan">Седан</label>
        </li>
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="body-type" value="universal" id="universal"
            ${disabled}
            ${selectedFilters[`body-type`] && selectedFilters[`body-type`].includes(`universal`) ? `checked` : ``}
          />
          <label for="universal">Универсал</label>
        </li>
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="body-type" value="hatchback" id="hatchback"
            ${disabled}
            ${selectedFilters[`body-type`] && selectedFilters[`body-type`].includes(`hatchback`) ? `checked` : ``}
          />
          <label for="hatchback">Хэтчбэк</label>
        </li>
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="body-type" value="suv" id="suv"
            ${disabled}
            ${selectedFilters[`body-type`] && selectedFilters[`body-type`].includes(`suv`) ? `checked` : ``}
          />
          <label for="suv">Внедорожник</label>
        </li>
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="body-type" value="coupe" id="coupe"
            ${disabled}
            ${selectedFilters[`body-type`] && selectedFilters[`body-type`].includes(`coupe`) ? `checked` : ``}
          />
          <label for="coupe">Купэ</label>
        </li>
      </ul>
    </fieldset>
  </div>`;

export class FilterCarsView extends AbstractFilterView {
  constructor(disabled, selectedFilters) {
    super();
    this.disabled = disabled ? `disabled` : ``;
    this.selectedFilters = selectedFilters;
  }

  getTemplate() {
    return createCarFilterTemplate(this.disabled, this.selectedFilters);
  }

  setFilterChangeHandler(callback) {
    super.setFilterChangeHandler(callback);
    const element = this.getElement();
    element.querySelector(`#production-year`).addEventListener(`change`, this.handleFilterChange);
    element.querySelector(`#gearbox-type`).addEventListener(`change`, this.handleFilterChange);
  }

  setCheckboxFilterChangeHandler(callback) {
    super.setCheckboxFilterChangeHandler(callback);
    this.getElement().querySelector(`#body-type`).addEventListener(`change`, this.handleCheckboxFilterChange);
  }
}
