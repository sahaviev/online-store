import { AbstractFilterView } from './abstract-filter-view.js';

const createEstateFilterTemplate = () => `<div class="filter__estate">
  <div class="filter__range">
    <label for="range">Цена, ₽</label>
    <input name="range" type="range" min="0" max="6000000" id="range">
  </div>
  <fieldset class="filter__type filter__type--estate">
    <legend>Тип недвижимости</legend>
    <ul class="filter__checkboxes-list filter__checkboxes-list--estate" id="estate-type">
      <li class="filter__checkboxes-item">
        <input class="visually-hidden" type="checkbox" name="estate-type" value="house" id="house_type" />
        <label for="house_type">Дом</label>
      </li>
      <li class="filter__checkboxes-item">
        <input class="visually-hidden" type="checkbox" name="estate-type" value="flat" id="flat_type"  />
        <label for="flat_type">Квартира</label>
      </li>
      <li class="filter__checkboxes-item">
        <input class="visually-hidden" type="checkbox" name="estate-type" value="apartments" id="apartments_type" />
        <label for="apartments_type">Апартаменты</label>
      </li>
    </ul>
  </fieldset>
  <div class="filter__min-square">
    <label for="square">Минимальная площать, м<sup>2</sup></label>
    <input type="number" id="square" name="min-square" min="1" value="" placeholder="0">
  </div>
  <fieldset class="filter__radiobuttons filter__radiobuttons--ram">
    <legend>Количество комнат</legend>
    <ul class="filter__ram-list" id="rooms">
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="any" id="any_room" />
        <label for="any_room">Любое</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="1" id="one_room" />
        <label for="one_room">1</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="2" id="two_room" />
        <label for="two_room">2</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="3" id="three_room" />
        <label for="three_room">3</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="4" id="four_room" />
        <label for="four_room">4</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="five_and_more" id="five_and_more" />
        <label for="five_and_more">5+</label>
      </li>
    </ul>
  </fieldset>
</div>`;

export class FilterEstateView extends AbstractFilterView {
  setFilterChangeHandler(callback) {
    super.setFilterChangeHandler(callback);
    const element = this.getElement();
    element.querySelector('#range').addEventListener('change', this.handleFilterChange);
    element.querySelector('#square').addEventListener('change', this.handleFilterChange);
    element.querySelector('#rooms').addEventListener('change', this.handleFilterChange);
  }

  setCheckboxFilterChangeHandler(callback) {
    super.setCheckboxFilterChangeHandler(callback);
    this.getElement().querySelector('#estate-type').addEventListener('change', this.handleCheckboxFilterChange);
  }

  getTemplate() {
    return createEstateFilterTemplate();
  }
}
