import {createSiteMenuTemplate} from './components/site-menu.js';
import {createFiltersTemplate} from './components/filters.js';
import {createSortTemplate} from './components/sorter.js';
import {createEditEventTemplate} from './components/event-editor.js';
import {createTripInfoTemplate} from './components/trip-info.js';
import {createTripContainerTemplate} from './components/trip-container.js';
import {createTripDayContainerTemplate} from './components/day-container.js';
import {createTripEventTemplate} from './components/trip-events.js';
import {createEventItemTemplate} from './components/event.js';
import {filters} from "./mock/filter";
import {sorter} from "./mock/sort";

const TASK_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteRouteElement = document.querySelector(`.trip-main__trip-info`);
render(siteRouteElement, createTripInfoTemplate(), `afterbegin`);

const siteMenuContainer = document.querySelector(`.trip-controls`);
render(siteMenuContainer, createSiteMenuTemplate(), `beforeend`);
render(siteMenuContainer, createFiltersTemplate(filters), `beforeend`);

const siteContentContainer = document.querySelector(`.trip-events`);
render(siteContentContainer, createSortTemplate(sorter), `beforeend`);
render(siteContentContainer, createEditEventTemplate(), `beforeend`);
render(siteContentContainer, createTripContainerTemplate(), `beforeend`);

const siteEventsContainer = siteContentContainer.querySelector(`.trip-days`);

new Array(TASK_COUNT)
  .fill(``)
  .forEach(
      () => render(siteEventsContainer, createTripDayContainerTemplate(), `beforeend`)
  );

const siteTripDayContainers = siteEventsContainer.querySelectorAll(`.day`);

Array.from(siteTripDayContainers)
  .forEach(
      (it) => render(it, createTripEventTemplate(), `beforeend`)
  );

const siteTripEventList = document.querySelectorAll(`.trip-events__list`);

Array.from(siteTripEventList)
  .forEach(
      (it) => new Array(TASK_COUNT)
      .fill(``)
      .forEach(
          () => render(it, createEventItemTemplate(), `beforeend`)
      )
  );

