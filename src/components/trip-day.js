import {monthNames} from "../const";
import {getDateFromStr} from "../utils";

export const createTripDayContainerTemplate = (date, dayIndex) => {
  //  дата для daydate контейнера дня
  const castDate = (data) => {
    const [dateNum, month, year] = getDateFromStr(data);
    return `${year}-${month + 1}-${dateNum}`;
  };

  //  дата для разметки дня с индексом
  const castomDate = (data) => {
    const [dateNum, month] = getDateFromStr(data);
    return `${monthNames[month]} ${dateNum}`;
  };
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
