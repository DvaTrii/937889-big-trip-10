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
import {render, RenderPosition} from "./utils";

const siteMenuContainer = document.querySelector(`.trip-controls`);
render(siteMenuContainer, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMenuContainer, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const siteContentContainer = document.querySelector(`.trip-events`);

if (tripEvents === []) {
  render(siteContentContainer, new NoEventsComponent().getElement(), RenderPosition.BEFOREEND);
} else {

  const siteRouteElement = document.querySelector(`.trip-main`);
  render(siteRouteElement, new TripInfoComponent(tripEvents).getElement(), RenderPosition.AFTERBEGIN);

  render(siteContentContainer, new SorterComponent(sorter).getElement(), RenderPosition.BEFOREEND);

  render(siteContentContainer, new TripContainerComponent().getElement(), RenderPosition.BEFOREEND);
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
      place.replaceChild(dayEditEvent.getElement(), dayEvent.getElement());
    };

    const replaceEditToEvent = () => {
      place.replaceChild(dayEvent.getElement(), dayEditEvent.getElement());
    };

    const editButton = dayEvent.getElement().querySelector(`.event__rollup-btn`);
    editButton.addEventListener(`click`, () => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const editForm = dayEditEvent.getElement().querySelector(`form`);
    editForm.addEventListener(`submit`, replaceEditToEvent);

    render(place, dayEvent.getElement(), RenderPosition.BEFOREEND);
  };

  dates.forEach((day, dayIndex) => {
    const dayContainer = new TripDayComponent(day, dayIndex).getElement();
    tripEvents.filter((dayEvent) => day === new Date(dayEvent.startDate).toDateString())
      .forEach((dayEvent) => {
        renderEvent(dayEvent, dayContainer.querySelector(`.trip-events__list`));
      });

    render(siteEventsContainer, dayContainer, RenderPosition.BEFOREEND);
  });
}
