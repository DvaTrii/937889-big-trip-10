import {monthNames} from "../const";
import AbstractComponent from "./abstract-component.js";

const createTripInfoTemplate = (data) => {

  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
            <h1 class="trip-info__title">${data[0].place} &mdash; ... &mdash; ${data[data.length - 1].place}</h1>

             <p class="trip-info__dates">${monthNames[new Date(data[0].startDate).getMonth()]}&nbsp;
                                         ${new Date(data[0].startDate).getDate()}&nbsp;&mdash;&nbsp;
                                         ${(monthNames[new Date(data[0].startDate).getMonth()] === monthNames[new Date(data[data.length - 1].endDate).getMonth()] ? `` : monthNames[new Date(data[data.length - 1].endDate).getMonth()] + ` `)}
                                         ${new Date(data[data.length - 1].endDate).getDate()}</p>
        </div>
        <p class="trip-info__cost">
                  Total: &euro;&nbsp;<span class="trip-info__cost-value">${data.reduce((acc, {price}) => acc + price, 0)}</span>
        </p>
    </section>`
  );
};

export default class TripInfo extends AbstractComponent {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createTripInfoTemplate(this._data);
  }
}
