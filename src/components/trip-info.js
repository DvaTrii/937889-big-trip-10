import AbstractSmartComponent from "./abstract-smart-component.js";
import {getFormatDate} from "../utils/common.js";
import {customMonth} from "../utils/common.js";

const createTripInfoTemplate = (data, price) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
            <h1 class="trip-info__title">${data[0].place} &mdash; ${data.length <= 2 ? data[1].place : `...`} &mdash; ${data[data.length - 1].place}</h1>

             <p class="trip-info__dates">${customMonth(data[0].startDate)}&nbsp;
                                         ${getFormatDate(data[0].startDate)}&nbsp;&mdash;&nbsp;
                                         ${(customMonth(data[0].startDate) === customMonth(data[data.length - 1].endDate) ? `` : customMonth(data[data.length - 1].endDate) + ` `)}
                                         ${getFormatDate(data[data.length - 1].endDate)}</p>
        </div>
        <p class="trip-info__cost">
                  Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
        </p>
    </section>`
  );
};

export default class TripInfo extends AbstractSmartComponent {
  constructor(data) {
    super();
    this._data = data;
    this._price = this._countPrice(this._data);
  }

  recoveryListeners() {
    this._countPrice(this._data);
  }

  getTemplate() {
    return createTripInfoTemplate(this._data, this._price);
  }

  _countPrice(data) {
    const pointsPrice = (points) => points.reduce((acc, {price}) => acc + Number(price), 0);
    const allOffersPrice = (points) => points.map((point) => point.offers.map((offer) => offer.price))
      .reduce((acc, item) => acc + item.reduce((res, price) => res + price, 0), 0);

    return pointsPrice(data) + allOffersPrice(data);
  }

  setNewPrice(data) {
    this._price = this._countPrice(data);

    this.rerender();
  }
}
