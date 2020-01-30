import SiteMenuComponent from "./components/site-menu.js";
import FilterComponent from "./components/filters.js";
import TripController from "./controllers/trip-controller.js";
import PointsModel from "./models/points-model.js";

import {tripEvents} from "./mock/mock.js";
import {render, RenderPosition} from "./utils/render.js";

const siteMenuContainer = document.querySelector(`.trip-controls`);

render(siteMenuContainer, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMenuContainer, new FilterComponent(), RenderPosition.BEFOREEND);

const siteContentContainer = document.querySelector(`.trip-events`);

const pointsModel = new PointsModel();
pointsModel.setPoints(tripEvents);

const tripController = new TripController(siteContentContainer, pointsModel);

tripController.render();
