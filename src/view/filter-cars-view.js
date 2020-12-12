import { AbstractFilterView } from './abstract-filter-view.js';

const createCarFilterTemplate = (disabled = false) => `<div class="filter__car">
    <div class="filter__range">
      <label for="range">Цена, ₽</label>
      <input name="range" type="range" min="0" max="6000000" id="range" ${disabled && 'disabled'}>
    </div>
    <div class="filter__select-wrapper">
      <label for="resolution-video">Минимальный год выпуска</label>
      <select id="car-year" name="production-year" ${disabled && 'disabled'}>
        <option value="any" selected>Любой</option>
        <option value="1950">1950</option>
        <option value="2000">2000</option>
        <option value="2010">2010</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
      </select>
      <svg width="14" height="8" viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" />
      </svg>
    </div>
    <fieldset class="filter__radiobuttons filter__radiobuttons--transmission">
      <legend>Коробка передач</legend>
      <ul class="filter__radiobuttons-list" id="gearbox-type">
        <li class="filter__radiobuttons-item">
          <input class="visually-hidden" type="radio" name="transmission" value="any" id="any_gearbox"  ${disabled && 'disabled'} checked>
          <label for="any_gearbox">Любая</label>
        </li>
        <li class="filter__radiobuttons-item">
          <input class="visually-hidden" type="radio" name="transmission" value="mechanic"  ${disabled && 'disabled'} id="mechanic_gearbox">
          <label for="mechanic_gearbox">Механика</label>
        </li>
        <li class="filter__radiobuttons-item">
          <input class="visually-hidden" type="radio" name="transmission" value="auto"  ${disabled && 'disabled'} id="auto_gearbox">
          <label for="auto_gearbox">Автомат</label>
        </li>
      </ul>
    </fieldset>
    <fieldset class="filter__type filter__type--car-body">
      <legend>Тип кузова</legend>
      <ul class="filter__checkboxes-list filter__checkboxes-list--car-body" id="body-type">
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="body-type" value="sedan"  ${disabled && 'disabled'} id="sedan">
          <label for="sedan">Седан</label>
        </li>
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="body-type" value="universal"  ${disabled && 'disabled'} id="universal">
          <label for="universal">Универсал</label>
        </li>
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="body-type" value="hatchback"  ${disabled && 'disabled'} id="hatchback">
          <label for="hatchback">Хэтчбэк</label>
        </li>
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="body-type" value="suv" ${disabled && 'disabled'} id="suv">
          <label for="suv">Внедорожник</label>
        </li>
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="body-type" value="coupe"  ${disabled && 'disabled'} id="coupe">
          <label for="coupe">Купэ</label>
        </li>
      </ul>
    </fieldset>
  </div>`;

export class FilterCarsView extends AbstractFilterView {
  constructor(disabled) {
    super();
    this.disabled = disabled;
  }

  setFilterChangeHandler(callback) {
    super.setFilterChangeHandler(callback);
    const element = this.getElement();
    element.querySelector('#range').addEventListener('change', this.handleFilterChange);
    element.querySelector('#car-year').addEventListener('change', this.handleFilterChange);
    element.querySelector('#gearbox-type').addEventListener('change', this.handleFilterChange);
  }

  setCheckboxFilterChangeHandler(callback) {
    super.setCheckboxFilterChangeHandler(callback);
    this.getElement().querySelector('#body-type').addEventListener('change', this.handleCheckboxFilterChange);
  }

  getTemplate() {
    return createCarFilterTemplate(this.disabled);
  }
}
