// import {createSiteMenuTemplate} from './components/site-menu.js';
// import {createFiltersTemplate} from './components/filters.js';
// import {createSortTemplate} from './components/sorter.js';
// import {createEditEventTemplate} from './components/event-editor.js';
// import {createTripInfoTemplate} from './components/trip-info.js';
// import {createTripContainerTemplate} from './components/trip-container.js';
// import {createTripDayTemplate} from './components/trip-day.js';
// import {createEventItemTemplate} from './components/event.js';
import TripInfo from "./components/trip-info";
import SiteMenu from "./components/site-menu";
import Filter from "./components/filters";
import Sorter from "./components/sorter";
import TripContainer from "./components/trip-container";
import TripDay from "./components/trip-day";
import Event from "./components/event";
import EventEdit from "./components/event-editor";

import {filters} from "./mock/filter";
import {sorter} from "./mock/sort";
import {tripEvents, dates} from "./mock/mock";
import {render, RenderPosition} from "./utils";

const siteRouteElement = document.querySelector(`.trip-main`);
render(siteRouteElement, new TripInfo(tripEvents).getElement(), RenderPosition.AFTERBEGIN);

const siteMenuContainer = document.querySelector(`.trip-controls`);
render(siteMenuContainer, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
render(siteMenuContainer, new Filter(filters).getElement(), RenderPosition.BEFOREEND);

const siteContentContainer = document.querySelector(`.trip-events`);
render(siteContentContainer, new Sorter(sorter).getElement(), RenderPosition.BEFOREEND);

render(siteContentContainer, new TripContainer().getElement(), RenderPosition.BEFOREEND);
const siteEventsContainer = siteContentContainer.querySelector(`.trip-days`);

dates.forEach((day, dayIndex) => {
  const dayContainer = new TripDay(day, dayIndex).getElement();
  tripEvents.filter((dayEvent) => day === new Date(dayEvent.startDate).toDateString())
    .forEach((dayEvent, eventIndex) => {
      render(
          dayContainer.querySelector(`.trip-events__list`),
          (eventIndex === 0 && dayIndex === 0) ? new EventEdit(dayEvent).getElement() : new Event(dayEvent).getElement(),
          RenderPosition.BEFOREEND);
    });

  render(siteEventsContainer, dayContainer, RenderPosition.BEFOREEND);
});
