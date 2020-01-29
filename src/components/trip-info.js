import AbstractComponent from "./abstract-component.js";
import {getFormatDate} from "../utils/common.js";
import {customMonth} from "../utils/common.js";

const createTripInfoTemplate = (data) => {

  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
            <h1 class="trip-info__title">${data[0].place} &mdash; ... &mdash; ${data[data.length - 1].place}</h1>

             <p class="trip-info__dates">${customMonth(data[0].startDate)}&nbsp;
                                         ${getFormatDate(data[0].startDate)}&nbsp;&mdash;&nbsp;
                                         ${(customMonth(data[0].startDate) === customMonth(data[data.length - 1].endDate) ? `` : customMonth(data[data.length - 1].endDate) + ` `)}
                                         ${getFormatDate(data[data.length - 1].endDate)}</p>
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
