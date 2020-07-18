import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/light.css";

import {formatDateTime} from "../utils/common.js";
import AbstractSmartComponent from "./abstrtact-smart-component";
import {pointType} from "../const.js";
import {CITIES} from "../mock/mock.js";

const createOfferMarkup = (offer) => {
  const {offerType, title, offerPrice, isChecked} = offer;

  return (
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerType}-1" type="checkbox" name="event-offer-${offerType}" ${isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offerType}-1">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
        </label>
      </div>`
  );
};

const createDestinationMarkup = (city) => {
  return (
    `<option value="${city}"></option>`
  );
};

const createPhotoMarkup = (photoSource) => {
  return (
    `<img class="event__photo" src="${photoSource}" alt="Event photo">`
  );
};

const createEditEventTemplate = (dayEvent, eventType) => {
  const {place, startDate, endDate, price, offers, description, isFavorite, photos} = dayEvent;

  const offersMarkup = offers.map((it) => createOfferMarkup(it)).join(`\n`);

  const photosMarkup = photos.map((it) => createPhotoMarkup(it)).join(`\n`);

  const citiesMarkup = CITIES.map((it) => createDestinationMarkup(it)).join(`\n`);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi"
                 ${eventType === `taxi` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus"
                ${eventType === `bus` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train"
                ${eventType === `train` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship"
                ${eventType === `ship` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport"
                ${eventType === `transport` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive"
                ${eventType === `drive` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight"
                ${eventType === `flight` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in"
                ${eventType === `check-in` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing"
                ${eventType === `sightseeing` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant"
                ${eventType === `restaurant` ? `checked` : ``}>
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${pointType[eventType]}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${place}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${citiesMarkup}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
          value="${formatDateTime(startDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
          value="${formatDateTime(endDate)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite"
        ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        ${place ? `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>` : ``}
      </header>
      ${place ? `<section class="event__details">

        ${offers ? `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">

            ${offersMarkup}

          </div>
        </section>` : ``}

        ${description ? `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">

              ${photosMarkup}

            </div>
          </div>
        </section>` : ``}
      </section>` : ``}
    </form>`
  );
};

const parseFormData = (formData, offers, photos, description) => {
  return {
    type: formData.get(`event-type`),
    place: formData.get(`event-destination`),
    startDate: formData.get(`event-start-time`),
    endDate: formData.get(`event-end-time`),
    price: formData.get(`event-price`),
    offers, // записываем временно так как по сети придут другие и парсит из моков не нужно тратить время через offers.map(offer => offer.checked)
    photos, // записываем временно так как по сети придут другие и парсит из моков не нужно тратить время
    description,
    isFavorite: !!formData.get(`event-favorite`),
  };
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(point) {
    super();
    this._point = point;
    this._pointType = point.type;
    this._pointOffers = point.offers;
    this._pointPhotos = point.photos;
    this._pointDescription = point.description;

    this._flatpickrStartDate = null;
    this._flatpickrEndDate = null;
    this._deleteButtonClickHandler = null;
    this._submitHandler = null;
    this._rollUpBtnClickHandler = null;

    this._applyFlatpickr();
    this._setEventType();
  }

  recoveryListeners() {
    this._setEventType();
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setSubmitHandler(this._submitHandler);
    this.setRollupButtonClickHandler(this._rollUpBtnClickHandler);
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  removeElement() {
    if (this._flatpickrStartDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrStartDate = null;
    }
    if (this._flatpickrEndDate) {
      this._flatpickrEndDate.destroy();
      this._flatpickrEndDate = null;
    }

    super.removeElement();
  }

  reset() {
    this.rerender();
  }

  getTemplate() {
    return createEditEventTemplate(this._point, this._pointType);
  }

  getData() {
    const formData = new FormData(this.getElement());

    return parseFormData(formData, this._pointOffers, this._pointPhotos, this._pointDescription);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setRollupButtonClickHandler(handler) {
    const rollupButtonElement = this.getElement().querySelector(`.event__rollup-btn`);
    if (rollupButtonElement) {
      rollupButtonElement.addEventListener(`click`, handler);
      this._rollUpBtnClickHandler = handler;
    }
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._deleteButtonClickHandler = handler;
  }

  _applyFlatpickr() {
    const startDateElement = this.getElement().querySelector(`#event-start-time-1`);
    this._flatpickrStartDate = flatpickr(startDateElement, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      altFormat: `d/m/y H:i`,
      defaultDate: this._point.startDate
    });

    const endDateElement = this.getElement().querySelector(`#event-end-time-1`);
    this._flatpickrEndDate = flatpickr(endDateElement, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      altFormat: `d/m/y H:i`,
      defaultDate: this._point.endDate
    });
  }

  _setEventType() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._pointType = evt.target.value;

        this.rerender();
      }
    });
  }
}
