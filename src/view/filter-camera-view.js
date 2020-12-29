import {AbstractFilterView} from './abstract-filter-view.js';

const matrixResolutions = [{
  value: `any`,
  label: `Любое`,
}, {
  value: `1mp`,
  label: `1 МП`,
}, {
  value: `3mp`,
  label: `3 МП`,
}, {
  value: `5mp`,
  label: `5 МП`,
}, {
  value: `7mp`,
  label: `7 МП`,
}, {
  value: `10mp`,
  label: `10 МП`,
}];

const videoResolutions = [{
  value: `any`,
  label: `Любое`,
}, {
  value: `hd`,
  label: `HD`,
}, {
  value: `full-hd`,
  label: `Full HD`,
}, {
  value: `4k`,
  label: `4K`,
}, {
  value: `5k`,
  label: `5K`,
}];

const createSelectOptions = (items, selected) => items
  .map((item) => (
    `<option value="${item.value}" ${item.value === selected && `selected`}>${item.label}</option>`
  ))
  .join(``);

const createCameraFilterTemplate = (disabled = ``, selectedFilters = {}) => `<div class="filter__camera">
    <fieldset class="filter__type filter__type--camera">
      <legend>Тип фотоаппарата</legend>
      <ul class="filter__checkboxes-list filter__checkboxes-list--camera" id="camera-type">
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="camera-type" value="slr" id="slr"
            ${disabled}
            ${selectedFilters[`camera-type`] && selectedFilters[`camera-type`].includes(`slr`) ? `checked` : ``}
          />
          <label for="slr">Зеркальный</label>
        </li>
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="camera-type" value="digital" id="digital"
            ${disabled}
            ${selectedFilters[`camera-type`] && selectedFilters[`camera-type`].includes(`digital`) ? `checked` : ``}
          />
          <label for="digital">Цифровой</label>
        </li>
        <li class="filter__checkboxes-item">
          <input class="visually-hidden" type="checkbox" name="camera-type" value="mirrorless" id="mirrorless"
            ${disabled}
            ${selectedFilters[`camera-type`] && selectedFilters[`camera-type`].includes(`mirrorless`) ? `checked` : ``}
          />
          <label for="mirrorless">Беззеркальный</label>
        </li>
      </ul>
    </fieldset>
    <div class="filter__select-wrapper filter__select-wrapper--min-resolution">
      <label for="resolution-matrix">Минимальное разрешение матрицы</label>
      <select id="resolution-matrix" name="resolution-matrix" ${disabled}>
          ${createSelectOptions(matrixResolutions, selectedFilters[`resolution-matrix`])}
      </select>
      <svg width="14" height="8" viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" />
      </svg>
    </div>
    <div class="filter__select-wrapper">
      <label for="resolution-video">Минимальное разрешение видео</label>
      <select id="resolution-video" name="resolution-video" ${disabled}>
        ${createSelectOptions(videoResolutions, selectedFilters[`resolution-video`])}
      </select>
      <svg width="14" height="8" viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" />
      </svg>
    </div>
  </div>`;

export class FilterCameraView extends AbstractFilterView {
  constructor(disabled, selectedFilters) {
    super();
    this.disabled = disabled ? `disabled` : ``;
    this.selectedFilters = selectedFilters;
  }

  getTemplate() {
    return createCameraFilterTemplate(this.disabled, this.selectedFilters);
  }

  setFilterChangeHandler(callback) {
    super.setFilterChangeHandler(callback);
    const element = this.getElement();
    element.querySelector(`#resolution-matrix`).addEventListener(`change`, this.handleFilterChange);
    element.querySelector(`#resolution-video`).addEventListener(`change`, this.handleFilterChange);
  }

  setCheckboxFilterChangeHandler(callback) {
    super.setCheckboxFilterChangeHandler(callback);
    this.getElement().querySelector(`#camera-type`).addEventListener(`change`, this.handleCheckboxFilterChange);
  }
}
