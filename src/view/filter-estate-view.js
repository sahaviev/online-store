import {AbstractFilterView} from './abstract-filter-view.js';

const createEstateFilterTemplate = (disabled = ``, selectedFilters = {}) => `<div class="filter__estate">
  <fieldset class="filter__type filter__type--estate">
    <legend>Тип недвижимости</legend>
    <ul class="filter__checkboxes-list filter__checkboxes-list--estate" id="estate-type">
      <li class="filter__checkboxes-item">
        <input class="visually-hidden" type="checkbox" name="estate-type" value="house" id="house_type"
            ${disabled}
            ${selectedFilters[`estate-type`] && selectedFilters[`estate-type`].includes(`house`) ? `checked` : ``}
        />
        <label for="house_type">Дом</label>
      </li>
      <li class="filter__checkboxes-item">
        <input class="visually-hidden" type="checkbox" name="estate-type" value="flat" id="flat_type"
            ${disabled}
            ${selectedFilters[`estate-type`] && selectedFilters[`estate-type`].includes(`flat`) ? `checked` : ``}
        />
        <label for="flat_type">Квартира</label>
      </li>
      <li class="filter__checkboxes-item">
        <input class="visually-hidden" type="checkbox" name="estate-type" value="apartment" id="apartments_type"
            ${disabled}
            ${selectedFilters[`estate-type`] && selectedFilters[`estate-type`].includes(`apartments`) ? `checked` : ``}
        />
        <label for="apartments_type">Апартаменты</label>
      </li>
    </ul>
  </fieldset>
  <div class="filter__min-square">
    <label for="square">Минимальная площать, м<sup>2</sup></label>
    <input type="number" id="square" name="min-square" min="1" placeholder="0"
        ${disabled}
        value="${selectedFilters[`min-square`] ? selectedFilters[`min-square`] : 0}"
    />
  </div>
  <fieldset class="filter__radiobuttons filter__radiobuttons--ram">
    <legend>Количество комнат</legend>
    <ul class="filter__ram-list" id="rooms">
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="any" id="any_room"
            ${disabled}
            ${selectedFilters.rooms && selectedFilters.rooms.includes(`any`) ? `checked` : ``}
        />
        <label for="any_room">Любое</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="1" id="one_room"
            ${disabled}
            ${selectedFilters.rooms && selectedFilters.rooms.includes(`1`) ? `checked` : ``}
        />
        <label for="one_room">1</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="2" id="two_room"
            ${disabled}
            ${selectedFilters.rooms && selectedFilters.rooms.includes(`2`) ? `checked` : ``}
         />
        <label for="two_room">2</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="3" id="three_room"
            ${disabled}
            ${selectedFilters.rooms && selectedFilters.rooms.includes(`3`) ? `checked` : ``}
        />
        <label for="three_room">3</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="4" id="four_room"
            ${disabled}
            ${selectedFilters.rooms && selectedFilters.rooms.includes(`4`) ? `checked` : ``}
        />
        <label for="four_room">4</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="five_and_more" id="five_and_more"
            ${disabled}
            ${selectedFilters.rooms && selectedFilters.rooms.includes(`five_and_more`) ? `checked` : ``}
        />
        <label for="five_and_more">5+</label>
      </li>
    </ul>
  </fieldset>
</div>`;

export class FilterEstateView extends AbstractFilterView {
  constructor(disabled, selectedFilters) {
    super();
    this.disabled = disabled ? `disabled` : ``;
    this.selectedFilters = selectedFilters;
  }

  getTemplate() {
    return createEstateFilterTemplate(this.disabled, this.selectedFilters);
  }

  setFilterChangeHandler(callback) {
    super.setFilterChangeHandler(callback);
    const element = this.getElement();
    element.querySelector(`#square`).addEventListener(`change`, this.handleFilterChange);
    element.querySelector(`#rooms`).addEventListener(`change`, this.handleFilterChange);
  }

  setCheckboxFilterChangeHandler(callback) {
    super.setCheckboxFilterChangeHandler(callback);
    this.getElement().querySelector(`#estate-type`).addEventListener(`change`, this.handleCheckboxFilterChange);
  }
}
