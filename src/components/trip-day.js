export const createTripDayContainerTemplate = (date, dayIndex) => {
  // let startDay = new Date(date).getDate();
  // dateGoodLooking(startDay);
  // let startMonth = new Date(date).getMonth() + 1;
  // dateGoodLooking(startMonth);
  // let startYear = new Date(date).getFullYear();
  // const dayDate = date.toDateString().slice(4, 10).toUpperCase();
  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayIndex + 1}</span>
          <time class="day__date" datetime="${date}">${date}</time>
        </div>
        <ul class="trip-events__list"></ul>
     </li>`
  );
};
