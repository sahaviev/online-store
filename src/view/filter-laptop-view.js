import { AbstractView } from '../utils/abstract-view.js';

export class FilterLaptopView extends AbstractView {
  getTemplate() {
    return `<div class="filter__laptop">
              <div class="filter__range">
                <label for="range">Цена, ₽</label>
                <input type="range" min="0" max="6000000" id="range">
              </div>
              <fieldset class="filter__type filter__type--laptop">
                <legend>Тип ноутбука</legend>
                <ul class="filter__checkboxes-list filter__checkboxes-list--laptop-ram">
                  <li class="filter__checkboxes-item">
                    <input class="visually-hidden" type="checkbox" name="laptop-type" value="ultra" id="ultra">
                    <label for="ultra">Ультрабук</label>
                  </li>
                  <li class="filter__checkboxes-item">
                    <input class="visually-hidden" type="checkbox" name="laptop-type" value="home" id="home">
                    <label for="home">Домашний ноутбук</label>
                  </li>
                  <li class="filter__checkboxes-item">
                    <input class="visually-hidden" type="checkbox" name="laptop-type" value="gaming" id="gaming">
                    <label for="gaming">Игровой ноутбук</label>
                  </li>
                </ul>
              </fieldset>
              <fieldset class="filter__radiobuttons filter__radiobuttons--ram">
                <legend>Минимальный объем оперативной памяти</legend>
                  <ul class="filter__radiobuttons-list">
                    <li class="filter__radiobuttons-item">
                      <input class="visually-hidden" type="radio" name="ram" value="any" id="any_ram">
                      <label for="any_ram">Любой</label>
                    </li>
                    <li class="filter__radiobuttons-item">
                      <input class="visually-hidden" type="radio" name="ram" value="4gb" id="4gb">
                      <label for="4gb">4 Гб</label>
                    </li>
                    <li class="filter__radiobuttons-item">
                      <input class="visually-hidden" type="radio" name="ram" value="8gb" id="8gb">
                      <label for="8gb">8 Гб</label>
                    </li>
                    <li class="filter__radiobuttons-item">
                      <input class="visually-hidden" type="radio" name="ram" value="16gb" id="16gb">
                      <label for="16gb">16 Гб</label>
                    </li>
                  </ul>
                </fieldset>
                <fieldset class="filter__radiobuttons filter__radiobuttons--diagonal">
                  <legend>Минимальная диагональ экрана</legend>
                  <ul class="filter__radiobuttons-list">
                    <li class="filter__radiobuttons-item">
                      <input class="visually-hidden" type="radio" name="diagonal" value="any" id="any_diagonal" checked>
                      <label for="any_diagonal">Любая</label>
                    </li>
                    <li class="filter__radiobuttons-item">
                      <input class="visually-hidden" type="radio" name="diagonal" value="13in" id="13in">
                      <label for="13in">13<sup>″</sup></label>
                    </li>
                    <li class="filter__radiobuttons-item">
                      <input class="visually-hidden" type="radio" name="diagonal" value="14in" id="14in">
                      <label for="14in">14<sup>″</sup></label>
                    </li>
                    <li class="filter__radiobuttons-item">
                      <input class="visually-hidden" type="radio" name="diagonal" value="15in" id="15in">
                      <label for="15in">15<sup>″</sup></label>
                    </li>
                    <li class="filter__radiobuttons-item">
                      <input class="visually-hidden" type="radio" name="diagonal" value="17in" id="17in">
                      <label for="17in">17<sup>″</sup></label>
                    </li>
                  </ul>
                </fieldset>
                <fieldset class="filter__type filter__type--laptop-processor">
                  <legend>Тип процессора</legend>
                  <ul class="filter__checkboxes-list filter__checkboxes-list--laptop-processor">
                    <li class="filter__checkboxes-item">
                      <input class="visually-hidden" type="checkbox" name="laptop-processor" value="i3" id="i3">
                      <label for="i3">Intel Core i3</label>
                    </li>
                    <li class="filter__checkboxes-item">
                      <input class="visually-hidden" type="checkbox" name="laptop-processor" value="i5" id="i5">
                      <label for="i5">Intel Core i5</label>
                    </li>
                    <li class="filter__checkboxes-item">
                      <input class="visually-hidden" type="checkbox" name="laptop-processor" value="i7" id="i7">
                      <label for="i7">Intel Core i7</label>
                    </li>
                  </ul>
                </fieldset>
              </div>`;
  }
}
