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

const renderEvent = (dayEvent, place) => {
  const dayEvt = new Event(dayEvent);
  const dayEditEvt = new EventEdit(dayEvent);
  const eventList = place;

  const editButton = dayEvt.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    eventList.replaceChild(dayEditEvt.getElement(), dayEvt.getElement());
  });

  const editForm = dayEditEvt.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    eventList.replaceChild(dayEvt.getElement(), dayEditEvt.getElement());
  });

  render(eventList, dayEvt.getElement(), RenderPosition.BEFOREEND);
};

dates.forEach((day, dayIndex) => {
  const dayContainer = new TripDay(day, dayIndex).getElement();
  tripEvents.filter((dayEvent) => day === new Date(dayEvent.startDate).toDateString())
    .forEach((dayEvent) => {
      renderEvent(dayEvent, dayContainer.querySelector(`.trip-events__list`));
    });

  render(siteEventsContainer, dayContainer, RenderPosition.BEFOREEND);
});
