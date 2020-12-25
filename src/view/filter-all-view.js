import {AbstractFilterView} from './abstract-filter-view.js';

const createRangeFilterTemplate = () => `<div></div>`;

export class FilterAllView extends AbstractFilterView {
  getTemplate() {
    return createRangeFilterTemplate();
  }
}
