import {castDate, castomDate} from "../utils";

export const createTripDayContainerTemplate = (date, dayIndex) => {
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
