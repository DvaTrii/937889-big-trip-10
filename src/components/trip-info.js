import {monthNames} from "../const";

export const createTripInfoTemplate = (data) => {
  const places = data.map((it) => it.place);
  const startDates = data.map((it) => new Date(it.startDate).getDate());
  const endDates = data.map((it) => new Date(it.endDate).getDate());
  const months = data.map((it) => new Date(it.endDate).getMonth());

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${places[0]} &mdash; ... &mdash; ${places[places.length - 1]}</h1>

      <p class="trip-info__dates">${monthNames[months[0]]}&nbsp;
                                  ${startDates[0]}&nbsp;&mdash;&nbsp;
                                  ${(monthNames[months[0]] === monthNames[months[months.length - 1]]) ? `` : monthNames[months[months.length - 1]] + ` `}
                                  ${endDates[endDates.length - 1]}</p>
    </div>`
  );
};
