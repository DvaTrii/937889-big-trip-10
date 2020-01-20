import SiteMenuComponent from "./components/site-menu.js";
import FilterComponent from "./components/filters.js";
import TripController from "./controller/trip.js";

import {filters} from "./mock/filter";
import {sorter} from "./mock/sort.js";
import {tripEvents, dates} from "./mock/mock.js";
import {render, RenderPosition} from "./utils/render.js";

const siteMenuContainer = document.querySelector(`.trip-controls`);

render(siteMenuContainer, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMenuContainer, new FilterComponent(filters), RenderPosition.BEFOREEND);

const siteContentContainer = document.querySelector(`.trip-events`);

const tripController = new TripController(siteContentContainer, tripEvents, sorter);

tripController.render(tripEvents, dates);
