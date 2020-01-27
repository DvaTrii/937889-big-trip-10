import SiteMenuComponent from "./components/site-menu.js";
import FilterComponent from "./components/filters.js";
import TripController from "./controller/trip-controller.js";

import {tripEvents} from "./mock/mock.js";
import {render, RenderPosition} from "./utils/render.js";

const siteMenuContainer = document.querySelector(`.trip-controls`);

render(siteMenuContainer, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMenuContainer, new FilterComponent(), RenderPosition.BEFOREEND);

const siteContentContainer = document.querySelector(`.trip-events`);

const tripController = new TripController(siteContentContainer);

tripController.render(tripEvents);
