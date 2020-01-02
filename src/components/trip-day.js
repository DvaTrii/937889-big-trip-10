import {castDate, castomDate, createElement} from "../utils";

export const createTripDayTemplate = (date, dayIndex) => {
  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayIndex + 1}</span>
          <time class="day__date" datetime="${castDate(date)}">${castomDate(date)}</time>
        </div>
        <ul class="trip-events__list"></ul>
     </li>`
  );
};

export default class TripDay {
  constructor(date, dayIndex) {
    this._date = date;
    this._dayIndex = dayIndex;
    this._element = null;
  }

  getTemplate() {
    return createTripDayTemplate(this._date, this._dayIndex);
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
