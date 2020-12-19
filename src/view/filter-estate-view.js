import { AbstractFilterView } from './abstract-filter-view.js';

const createEstateFilterTemplate = (disabled = false, selectedFilters = {}) => `<div class="filter__estate">
  <fieldset class="filter__type filter__type--estate">
    <legend>Тип недвижимости</legend>
    <ul class="filter__checkboxes-list filter__checkboxes-list--estate" id="estate-type">
      <li class="filter__checkboxes-item">
        <input 
            class="visually-hidden"
            type="checkbox"
            name="estate-type"
            value="house"
            ${disabled && 'disabled'}
            ${selectedFilters['estate-type'] && selectedFilters['estate-type'].includes('house') ? 'checked' : ''}
            id="house_type"
        />
        <label for="house_type">Дом</label>
      </li>
      <li class="filter__checkboxes-item">
        <input 
            class="visually-hidden" 
            type="checkbox"
            name="estate-type"
            value="flat"
            ${disabled && 'disabled'}
            id="flat_type"
            ${selectedFilters['estate-type'] && selectedFilters['estate-type'].includes('flat') ? 'checked' : ''}
        />
        <label for="flat_type">Квартира</label>
      </li>
      <li class="filter__checkboxes-item">
        <input
            class="visually-hidden"
            type="checkbox"
            name="estate-type"
            value="apartments"
            ${disabled && 'disabled'}
            id="apartments_type"
            ${selectedFilters['estate-type'] && selectedFilters['estate-type'].includes('flat') ? 'checked' : ''}
        />
        <label for="apartments_type">Апартаменты</label>
      </li>
    </ul>
  </fieldset>
  <div class="filter__min-square">
    <label for="square">Минимальная площать, м<sup>2</sup></label>
    <input 
        type="number"
        id="square"
        name="min-square"
        min="1"
        value="${selectedFilters['min-square'] ? selectedFilters['min-square'] : 0}"
        ${disabled && 'disabled'}
        placeholder="0"
      />
  </div>
  <fieldset class="filter__radiobuttons filter__radiobuttons--ram">
    <legend>Количество комнат</legend>
    <ul class="filter__ram-list" id="rooms">
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="any" ${disabled && 'disabled'} id="any_room" />
        <label for="any_room">Любое</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="1" ${disabled && 'disabled'} id="one_room" />
        <label for="one_room">1</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="2" ${disabled && 'disabled'} id="two_room" />
        <label for="two_room">2</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="3" ${disabled && 'disabled'} id="three_room" />
        <label for="three_room">3</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="4" ${disabled && 'disabled'} id="four_room" />
        <label for="four_room">4</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="five_and_more" ${disabled && 'disabled'} id="five_and_more" />
        <label for="five_and_more">5+</label>
      </li>
    </ul>
  </fieldset>
</div>`;

export class FilterEstateView extends AbstractFilterView {
  constructor(disabled, selectedFilters) {
    super();
    this.disabled = disabled;
    this.selectedFilters = selectedFilters;
  }

  setFilterChangeHandler(callback) {
    super.setFilterChangeHandler(callback);
    const element = this.getElement();
    element.querySelector('#square').addEventListener('change', this.handleFilterChange);
    element.querySelector('#rooms').addEventListener('change', this.handleFilterChange);
  }

  setCheckboxFilterChangeHandler(callback) {
    super.setCheckboxFilterChangeHandler(callback);
    this.getElement().querySelector('#estate-type').addEventListener('change', this.handleCheckboxFilterChange);
  }

  getTemplate() {
    return createEstateFilterTemplate(this.disabled, this.selectedFilters);
  }
}
