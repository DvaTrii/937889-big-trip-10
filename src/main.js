import TripInfoComponent from "./components/trip-info.js";
import SiteMenuComponent from "./components/site-menu.js";
import FilterComponent from "./components/filters.js";
import SorterComponent from "./components/sorter.js";
import TripContainerComponent from "./components/trip-container.js";
import TripDayComponent from "./components/trip-day.js";
import EventComponent from "./components/event.js";
import EventEditComponent from "./components/event-editor.js";
import NoEventsComponent from './components/no-events.js';

import {filters} from "./mock/filter";
import {sorter} from "./mock/sort";
import {tripEvents, dates} from "./mock/mock";
import {render, replace, RenderPosition} from "./utils/render.js";

const siteMenuContainer = document.querySelector(`.trip-controls`);

render(siteMenuContainer, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMenuContainer, new FilterComponent(filters), RenderPosition.BEFOREEND);

const siteContentContainer = document.querySelector(`.trip-events`);

if (tripEvents.length === 0) {
  render(siteContentContainer, new NoEventsComponent(), RenderPosition.BEFOREEND);
} else {

  const siteRouteElement = document.querySelector(`.trip-main`);
  render(siteRouteElement, new TripInfoComponent(tripEvents), RenderPosition.AFTERBEGIN);

  render(siteContentContainer, new SorterComponent(sorter), RenderPosition.BEFOREEND);

  render(siteContentContainer, new TripContainerComponent(), RenderPosition.BEFOREEND);
  const siteEventsContainer = siteContentContainer.querySelector(`.trip-days`);

  const renderEvent = (event, place) => {
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const dayEvent = new EventComponent(event);
    const dayEditEvent = new EventEditComponent(event);

    const replaceEventToEdit = () => {
      replace(dayEditEvent, dayEvent);
    };

    const replaceEditToEvent = () => {
      replace(dayEvent, dayEditEvent);
    };

    dayEvent.setClickHandler(() => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    dayEditEvent.setSubmitHandler(replaceEditToEvent());

    render(place, dayEvent, RenderPosition.BEFOREEND);
  };

  dates.forEach((day, dayIndex) => {
    const dayContainer = new TripDayComponent(day, dayIndex);
    tripEvents.filter((dayEvent) => day === new Date(dayEvent.startDate).toDateString())
      .forEach((dayEvent) => {
        renderEvent(dayEvent, dayContainer.getElement().querySelector(`.trip-events__list`));
      });

    render(siteEventsContainer, dayContainer, RenderPosition.BEFOREEND);
  });
}
