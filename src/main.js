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

const siteRouteElement = document.querySelector(`.trip-main`);
render(siteRouteElement, new TripInfoComponent(tripEvents).getElement(), RenderPosition.AFTERBEGIN);

const siteMenuContainer = document.querySelector(`.trip-controls`);
render(siteMenuContainer, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMenuContainer, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const siteContentContainer = document.querySelector(`.trip-events`);

if (tripEvents === []) {
  render(siteContentContainer, new NoEventsComponent().getElement(), RenderPosition.BEFOREEND);
} else {
  render(siteContentContainer, new SorterComponent(sorter).getElement(), RenderPosition.BEFOREEND);

  render(siteContentContainer, new TripContainerComponent().getElement(), RenderPosition.BEFOREEND);
  const siteEventsContainer = siteContentContainer.querySelector(`.trip-days`);

  const renderEvent = (dayEvent, place) => {
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const dayEvt = new EventComponent(dayEvent);
    const dayEditEvt = new EventEditComponent(dayEvent);
    const eventList = place;

    const replaceEventToEdit = () => {
      eventList.replaceChild(dayEditEvt.getElement(), dayEvt.getElement());
    };

    const replaceEditToEvent = () => {
      eventList.replaceChild(dayEvt.getElement(), dayEditEvt.getElement());
    };

    const editButton = dayEvt.getElement().querySelector(`.event__rollup-btn`);
    editButton.addEventListener(`click`, () => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const editForm = dayEditEvt.getElement().querySelector(`form`);
    editForm.addEventListener(`submit`, replaceEditToEvent);

    render(eventList, dayEvt.getElement(), RenderPosition.BEFOREEND);
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

