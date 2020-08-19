import {castDateTime, customTime, getDurationTime} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";
import {pointType} from "../const.js";

const createOfferMarkup = (offer) => {
  const {price, title} = offer;
  return (
    `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
       </li>`);
};

const createEventItemTemplate = (dayEvent) => {
  const {type, place, startDate, endDate, price, offers} = dayEvent;

  const offersMarkup = offers.map((it) => createOfferMarkup(it)).join(`\n`);

  return (
    `<div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${pointType[type]} ${place}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${castDateTime(startDate)}">${customTime(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${castDateTime(endDate)}">${customTime(endDate)}</time>
          </p>
          <p class="event__duration">${getDurationTime(startDate, endDate)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersMarkup}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>`
  );
};

export default class Event extends AbstractComponent {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createEventItemTemplate(this._point);
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
