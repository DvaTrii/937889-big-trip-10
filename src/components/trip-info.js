import {monthNames} from "../const";
import {createElement} from "../utils";

const createTripInfoTemplate = (data) => {
  const places = data.map((it) => it.place);
  const startDates = data.map((it) => new Date(it.startDate).getDate());
  const endDates = data.map((it) => new Date(it.endDate).getDate());
  const months = data.map((it) => monthNames[new Date(it.endDate).getMonth()]);
  const price = data.map((it) => it.price).reduce((acc, cur) => acc + cur);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${places[0]} &mdash; ... &mdash; ${places[places.length - 1]}</h1>

      <p class="trip-info__dates">${months[0]}&nbsp;
                                  ${startDates[0]}&nbsp;&mdash;&nbsp;
                                  ${(months[0] === months[months.length - 1]) ? `` : months[months.length - 1] + ` `}
                                  ${endDates[endDates.length - 1]}</p>
    </div>
    <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>`
  );
};

export default class TripInfo {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._data);
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
