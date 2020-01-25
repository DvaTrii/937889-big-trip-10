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
    onDataChange,
    isDefaultSorting = true
) => {
  const pointControllers = [];
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
        const pointController = new PointController(
            day.getElement().querySelector(`.trip-events__list`),
            onDataChange);
        pointController.render(_event);
        pointControllers.push(pointController);
      });

    render(container.getElement(), day, RenderPosition.BEFOREEND);
  });

  return pointControllers;
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noEventsComponent = new NoEventsComponent();
    this._sorterComponent = new SorterComponent();
    this._tripInfoComponent = null;
    this._tripContainerComponent = new TripContainerComponent();

    this._onDataChange = this._onDataChange.bind(this);
  }

  render(events) {
    if (events.length === 0) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
    } else {

      const siteRouteElement = document.querySelector(`.trip-main`);
      this._tripInfoComponent = new TripInfoComponent(events);
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
        renderEvents(sortedEvents, this._tripContainerComponent, this._onDataChange, isDefaultSorting);

      });
    }
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }
}
