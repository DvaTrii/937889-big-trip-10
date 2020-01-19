import {castDateTime} from "../utils/render";
import AbstractComponent from "./abstract-component.js";

const createOfferMarkup = (offer) => {
  const {title, offerPrice, isChecked} = offer;
  return (isChecked ?
    `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
       </li>` : ``);
};

const createEventItemTemplate = (dayEvent) => {
  const {type, place, startDate, endDate, price, offers} = dayEvent;

  const offersMarkup = offers.map((it) => createOfferMarkup(it)).join(`\n`);

  return (
    `<li class="trip-events__item">
        <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${place}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${castDateTime(startDate)}">10:30</time>
          &mdash;
          <time class="event__end-time" datetime="${castDateTime(endDate)}">11:00</time>
        </p>
        <p class="event__duration">1H 30M</p>
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
    </div>
    </li>`
  );
};

export default class Event extends AbstractComponent {
  constructor(dayEvent) {
    super();
    this._dayEvent = dayEvent;
  }

  getTemplate() {
    return createEventItemTemplate(this._dayEvent);
  }
}

