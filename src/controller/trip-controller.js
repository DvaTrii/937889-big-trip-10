import TripInfoComponent from "../components/trip-info.js";
import SorterComponent, {SortType} from "../components/sorter.js";
import TripContainerComponent from "../components/trip-container.js";
import TripDayComponent from "../components/trip-day.js";
import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-editor.js";
import NoEventsComponent from '../components/no-events.js';

import {render, replace, RenderPosition} from "../utils/render.js";
import {tripEvents} from "../mock/mock";

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

const renderEvents = (
    events,
    container,
    isDefaultSorting = true
) => {
  render(container, new TripContainerComponent(), RenderPosition.BEFOREEND);
  const siteEventsContainer = container.querySelector(`.trip-days`);

  const dates = isDefaultSorting
    ? [...new Set(tripEvents.map((it) => new Date(it.startDate).toDateString()))]
    : [true];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting
      ? new TripDayComponent(date, dateIndex)
      : new TripDayComponent();

    events
      .filter((_event) => {
        return isDefaultSorting
          ? day === new Date(_event.startDate).toDateString()
          : _event;
      })
      .forEach((_event) => {
        renderEvent(_event, day.getElement().querySelector(`.trip-events__list`));
      });

    render(siteEventsContainer, day, RenderPosition.BEFOREEND);
  });
  // dates.forEach((day, dayIndex) => {
  //   const dayContainer = new TripDayComponent(day, dayIndex);
  //   events.filter((dayEvent) => day === new Date(dayEvent.startDate).toDateString())
  //     .forEach((dayEvent) => {
  //       renderEvent(dayEvent, dayContainer.getElement().querySelector(`.trip-events__list`));
  //     });
  //
  //   render(siteEventsContainer, dayContainer, RenderPosition.BEFOREEND);
  // });
};

export default class TripController {
  constructor(container, events) {
    this._container = container;

    this._noEventsComponent = new NoEventsComponent();
    this._tripInfoComponent = new TripInfoComponent(events);
    this._sorterComponent = new SorterComponent();
  }

  render(events, dates) {
    if (events.length === 0) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
    } else {

      const siteRouteElement = document.querySelector(`.trip-main`);
      render(siteRouteElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

      render(this._container, this._sorterComponent, RenderPosition.BEFOREEND);
      // renderEvents(events, dates, this._container);

      this._sorterComponent.setSortTypeChangeHandler((sortType) => {
        // let isDefaultSorting = false;
        let sortedEvents = [];

        switch (sortType) {
          case SortType.EVENT_DOWN:
            sortedEvents = events.slice();
            // isDefaultSorting = true;
            break;
          case SortType.PRICE_DOWN:
            sortedEvents = events.slice().sort((a, b) => b.price - a.price);
            break;
          case SortType.TIME_DOWN:
            sortedEvents = events.slice().sort((a, b) => b.startDate - a.startDate);
            break;
        }

        this._container.getElement().innerHeight = ``;
        renderEvents(sortedEvents, dates, this._container);

      });
    }
  }
}
