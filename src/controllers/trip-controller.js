import TripInfoComponent from "../components/trip-info.js";
import SorterComponent, {SortType} from "../components/sorter.js";
import TripContainerComponent from "../components/trip-container.js";
import TripDayComponent from "../components/trip-day.js";
import NoEventsComponent from '../components/no-events.js';
import PointController, {Mode as PointControllerMode, EmptyPoint} from "./point-controller.js";

import {render, RenderPosition} from "../utils/render.js";

const renderPoints = (
    points,
    container,
    onDataChange,
    onViewChange,
    isDefaultSorting = true
) => {
  const pointControllers = [];
  const dates = isDefaultSorting
    ? [...new Set(points.map((it) => new Date(it.startDate).toDateString()))]
    : [true];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting
      ? new TripDayComponent(date, dateIndex)
      : new TripDayComponent();

    points
      .filter((_point) => {
        return isDefaultSorting
          ? date === new Date(_point.startDate).toDateString()
          : _point;
      })
      .forEach((_point) => {
        const pointController = new PointController(
            day.getElement().querySelector(`.trip-events__list`),
            onDataChange,
            onViewChange);
        pointController.render(_point, PointControllerMode.DEFAULT);
        pointControllers.push(pointController);
      });

    render(container.getElement(), day, RenderPosition.BEFOREEND);
  });

  return pointControllers;
};

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._showedPointControllers = [];
    this._points = null;
    this._creatingPoint = null;

    this._noEventsComponent = new NoEventsComponent();
    this._sorterComponent = new SorterComponent();
    this._tripInfoComponent = null;
    this._tripContainerComponent = new TripContainerComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._points = this._pointsModel.getPoints();

    if (this._points.length === 0) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
    } else {

      const siteTripElement = document.querySelector(`.trip-main`);
      this._tripInfoComponent = new TripInfoComponent(this._points);
      render(siteTripElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

      render(this._container, this._sorterComponent, RenderPosition.BEFOREEND);
      render(this._container, this._tripContainerComponent, RenderPosition.BEFOREEND);

      this._showedPointControllers = renderPoints(this._pointsModel.getPoints(), this._tripContainerComponent, this._onDataChange, this._onViewChange);

      this._sorterComponent.setSortTypeChangeHandler((sortType) => {
        let isDefaultSorting = false;
        let sortedEvents = [];

        switch (sortType) {
          case SortType.EVENT_DOWN:
            sortedEvents = this._points.slice();
            isDefaultSorting = true;
            break;
          case SortType.PRICE_DOWN:
            sortedEvents = this._points.slice().sort((a, b) => b.price - a.price);
            break;
          case SortType.TIME_DOWN:
            sortedEvents = this._points.slice().sort((a, b) => b.startDate - a.startDate);
            break;
        }

        this._tripContainerComponent.getElement().innerHTML = ``;
        this._showedPointControllers = renderPoints(sortedEvents, this._tripContainerComponent, this._onDataChange, this._onViewChange, isDefaultSorting);

      });
    }
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._creatingPoint = new PointController(this._container, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, PointControllerMode.ADDING);
  }

  _removePoints() {
    this._tripContainerComponent.getElement().innerHTML = ``;
    this._showedPointControllers.forEach((el) => el.destroy());
    this._showedPointControllers = [];
  }

  _updatePoints() {
    this._removePoints();
    this._showedPointControllers = renderPoints(this._pointsModel.getPoints(), this._tripContainerComponent, this._onDataChange, this._onViewChange);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addTask(newData);
        pointController.render(newData, PointControllerMode.DEFAULT);

        const destroyedPoint = this._showedPointControllers.pop();
        destroyedPoint.destroy();
        this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
