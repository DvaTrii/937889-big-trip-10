import {createSiteMenuTemplate} from './components/site-menu.js';
import {createFiltersTemplate} from './components/filters.js';
import {createSortTemplate} from './components/sorter.js';
import {createEditEventTemplate} from './components/event-editor.js';
import {createTripInfoTemplate} from './components/trip-info.js';
import {createTripContainerTemplate} from './components/trip-container.js';
import {createTripDayContainerTemplate} from './components/trip-day.js';
import {createEventItemTemplate} from './components/event.js';
import {filters} from "./mock/filter";
import {sorter} from "./mock/sort";
import {tripEvents, dates} from "./mock/mock";
import {createElement, renderElement} from "./utils";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteRouteElement = document.querySelector(`.trip-main__trip-info`);
render(siteRouteElement, createTripInfoTemplate(tripEvents), `afterbegin`);

const siteMenuContainer = document.querySelector(`.trip-controls`);
render(siteMenuContainer, createSiteMenuTemplate(), `beforeend`);
render(siteMenuContainer, createFiltersTemplate(filters), `beforeend`);

const siteContentContainer = document.querySelector(`.trip-events`);
render(siteContentContainer, createSortTemplate(sorter), `beforeend`);

render(siteContentContainer, createTripContainerTemplate(), `beforeend`);
const siteEventsContainer = siteContentContainer.querySelector(`.trip-days`);

dates.forEach((day, dayIndex) => {
  const dayContainer = createElement(createTripDayContainerTemplate(day, dayIndex));
  tripEvents.filter((dayEvent) => day === new Date(dayEvent.startDate).toDateString())
    .forEach((dayEvent, eventIndex) => {
      renderElement(
          dayContainer.querySelector(`.trip-events__list`),
          createElement((eventIndex === 0 && dayIndex === 0) ? createEditEventTemplate(dayEvent) : createEventItemTemplate(dayEvent)));
    });

  renderElement(siteEventsContainer, dayContainer);
});
