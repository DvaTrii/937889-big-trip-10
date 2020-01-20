import {castDate, castomDate} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const createTripDayTemplate = (date, dayIndex) => {
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

export default class TripDay extends AbstractComponent {
  constructor(date, dayIndex) {
    super();
    this._date = date;
    this._dayIndex = dayIndex;
  }

  getTemplate() {
    return createTripDayTemplate(this._date, this._dayIndex);
  }
}
