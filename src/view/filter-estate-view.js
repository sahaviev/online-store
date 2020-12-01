import { AbstractView } from '../utils/abstract-view.js';

export class FilterEstateView extends AbstractView {
  getTemplate() {
    return `<div class="filter__estate">
  <div class="filter__range">
    <label for="range">Цена, ₽</label>
    <input type="range" min="0" max="6000000" id="range">
  </div>
  <fieldset class="filter__type filter__type--estate">
    <legend>Тип недвижимости</legend>
    <ul class="filter__checkboxes-list filter__checkboxes-list--estate">
      <li class="filter__checkboxes-item">
        <input class="visually-hidden" type="checkbox" name="estate-type" value="house" id="house">
        <label for="house">Дом</label>
      </li>
      <li class="filter__checkboxes-item">
        <input class="visually-hidden" type="checkbox" name="estate-type" value="flat" id="flat">
        <label for="flat">Квартира</label>
      </li>
      <li class="filter__checkboxes-item">
        <input class="visually-hidden" type="checkbox" name="estate-type" value="apartments" id="apartments">
        <label for="apartments">Апартаменты</label>
      </li>
    </ul>
  </fieldset>
  <div class="filter__min-square">
    <label for="square">Минимальная площать, м<sup>2</sup></label>
    <input type="number" id="square" name="min-square" min="1" value="" placeholder="0">
  </div>
  <fieldset class="filter__radiobuttons filter__radiobuttons--ram">
    <legend>Количество комнат</legend>
    <ul class="filter__ram-list">
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="any" id="any_room">
        <label for="any_room">Любое</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="one" id="one">
        <label for="one">1</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="two" id="two">
        <label for="two">2</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="three" id="three">
        <label for="three">3</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="four" id="four">
        <label for="four">4</label>
      </li>
      <li class="filter__radiobuttons-item">
        <input class="visually-hidden" type="radio" name="rooms" value="fivemore" id="fivemore">
        <label for="fivemore">5+</label>
      </li>
    </ul>
  </fieldset>
</div>`;
  }
}
