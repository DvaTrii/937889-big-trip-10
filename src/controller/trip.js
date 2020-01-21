import TripInfoComponent from "../components/trip-info.js";
import SorterComponent from "../components/sorter.js";
import TripContainerComponent from "../components/trip-container.js";
import TripDayComponent from "../components/trip-day.js";
import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-editor.js";
import NoEventsComponent from '../components/no-events.js';

import {render, replace, RenderPosition} from "../utils/render.js";

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

export default class TripController {
  constructor(container, events) {
    this._container = container;

    this._noEventsComponent = new NoEventsComponent();
    this._tripInfoComponent = new TripInfoComponent(events);
    this._sorterComponent = new SorterComponent();
    this._tripContainerComponent = new TripContainerComponent();
  }

  render(events, dates) {
    if (events.length === 0) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
    } else {

      const siteRouteElement = document.querySelector(`.trip-main`);
      render(siteRouteElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

      render(this._container, this._sorterComponent, RenderPosition.BEFOREEND);

      render(this._container, this._tripContainerComponent, RenderPosition.BEFOREEND);
      const siteEventsContainer = this._container.querySelector(`.trip-days`);

      dates.forEach((day, dayIndex) => {
        const dayContainer = new TripDayComponent(day, dayIndex);
        events.filter((dayEvent) => day === new Date(dayEvent.startDate).toDateString())
          .forEach((dayEvent) => {
            renderEvent(dayEvent, dayContainer.getElement().querySelector(`.trip-events__list`));
          });

        render(siteEventsContainer, dayContainer, RenderPosition.BEFOREEND);
      });
    }
  }
}
