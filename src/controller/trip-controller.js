import TripInfoComponent from "../components/trip-info.js";
import SorterComponent, {SortType} from "../components/sorter.js";
import TripContainerComponent from "../components/trip-container.js";
import TripDayComponent from "../components/trip-day.js";
import NoEventsComponent from '../components/no-events.js';
import PointController from "./point-controller.js";

import {render, RenderPosition} from "../utils/render.js";
import {tripEvents} from "../mock/mock";

const renderEvents = (
    events,
    container,
    isDefaultSorting = true
) => {

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
          ? date === new Date(_event.startDate).toDateString()
          : _event;
      })
      .forEach((_event) => {
        new PointController(day.getElement().querySelector(`.trip-events__list`), _event).render();
      });

    render(container.getElement(), day, RenderPosition.BEFOREEND);
  });
};

export default class TripController {
  constructor(container, events) {
    this._container = container;

    this._noEventsComponent = new NoEventsComponent();
    this._tripInfoComponent = new TripInfoComponent(events);
    this._sorterComponent = new SorterComponent();
    this._tripContainerComponent = new TripContainerComponent();
  }

  render(events) {
    if (events.length === 0) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
    } else {

      const siteRouteElement = document.querySelector(`.trip-main`);
      render(siteRouteElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

      render(this._container, this._sorterComponent, RenderPosition.BEFOREEND);
      render(this._container, this._tripContainerComponent, RenderPosition.BEFOREEND);

      renderEvents(events, this._tripContainerComponent);

      this._sorterComponent.setSortTypeChangeHandler((sortType) => {
        let isDefaultSorting = false;
        let sortedEvents = [];

        switch (sortType) {
          case SortType.EVENT_DOWN:
            sortedEvents = events.slice();
            isDefaultSorting = true;
            break;
          case SortType.PRICE_DOWN:
            sortedEvents = events.slice().sort((a, b) => b.price - a.price);
            break;
          case SortType.TIME_DOWN:
            sortedEvents = events.slice().sort((a, b) => b.startDate - a.startDate);
            break;
        }

        this._tripContainerComponent.getElement().innerHTML = ``;
        renderEvents(sortedEvents, this._tripContainerComponent, isDefaultSorting);

      });
    }
  }
}
