import API from "./api.js";
import SiteMenuComponent from "./components/site-menu.js";
import StatisticsComponent from "./components/statistics.js";
import TripController from "./controllers/trip-controller.js";
import FilterController from "./controllers/filter-controller.js";
import PointsModel from "./models/points-model.js";
import {MenuItems} from "./const.js";

import {render, RenderPosition} from "./utils/render.js";

const AUTHORIZATION = `Basic dXNchar9yZAo=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip`;

const api = new API(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();

const siteMenuContainer = document.querySelector(`.trip-controls`);
const siteMenu = new SiteMenuComponent();
render(siteMenuContainer, siteMenu, RenderPosition.BEFOREEND);

const filterController = new FilterController(siteMenuContainer, pointsModel);
filterController.render();

const siteContentContainer = document.querySelector(`.trip-events`);
const tripController = new TripController(siteContentContainer, pointsModel, api);

const bodyContainer = document.querySelector(`.page-main .page-body__container`);
const statisticsComponent = new StatisticsComponent();
render(bodyContainer, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

document.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tripController.createPoint();
  });

siteMenu.setSiteMenuItemClickHandler((currentSiteMenuItem) => {
  switch (currentSiteMenuItem) {
    case MenuItems.TABLE:
      tripController.show();
      statisticsComponent.hide();
      break;
    case MenuItems.STATS:
      statisticsComponent.show();
      tripController.hide();
      break;
  }
});

Promise.all([api.getDestinations(), api.getPoints()])
  .then((values) => {
    pointsModel.setPoints(values[1]);
    tripController.render();
  });
