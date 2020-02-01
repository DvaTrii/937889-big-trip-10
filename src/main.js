import SiteMenuComponent from "./components/site-menu.js";
import TripController from "./controllers/trip-controller.js";
import FilterController from "./controllers/filter-controller.js";
import PointsModel from "./models/points-model.js";

import {tripEvents} from "./mock/mock.js";
import {render, RenderPosition} from "./utils/render.js";

const siteMenuContainer = document.querySelector(`.trip-controls`);
const siteMenuComponent = new SiteMenuComponent();

// Быстрое решение для подписки на клик по кнопке.
// Это противоречит нашей архитектуре работы с DOM-элементами, но это временное решение.
// Совсем скоро мы создадим полноценный компонент для работы с меню.

siteMenuComponent.getElement().querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tripController.createPoint();
  });

render(siteMenuContainer, siteMenuComponent, RenderPosition.BEFOREEND);

const siteContentContainer = document.querySelector(`.trip-events`);

const pointsModel = new PointsModel();
pointsModel.setPoints(tripEvents);

const filterController = new FilterController(siteMenuContainer, pointsModel);
filterController.render();
const tripController = new TripController(siteContentContainer, pointsModel);

tripController.render();
