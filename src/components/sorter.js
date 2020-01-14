import {createElement} from "../utils";

const createDirectionIconMarkup = () => {
  return (
    `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
       <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
     </svg>`
  );
};

const createSortItemMarkup = (sortItem) => {
  const {sortBy, isChecked} = sortItem;

  return (
    `<div class="trip-sort__item  trip-sort__item--${sortBy.toLowerCase()}">
        <input id="sort-${sortBy.toLowerCase()}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortBy.toLowerCase()}"
        ${isChecked ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${sortBy.toLowerCase()}">${sortBy}</label>
     </div>
     ${(sortBy !== `Event`) ? createDirectionIconMarkup() : ``}`
  );
};

const createSortTemplate = (sorter) => {
  const sorterMarkup = sorter.map((it) => createSortItemMarkup(it)).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      ${sorterMarkup}

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class Sorter {
  constructor(sorter) {
    this._sorter = sorter;
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate(this._sorter);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
