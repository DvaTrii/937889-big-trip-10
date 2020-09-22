import API from "../api.js";
import SiteMenuComponent from "../components/site-menu.js";
import StatisticsComponent from "../components/statistics.js";
import TripController from "../controllers/trip-controller.js";
import FilterController from "../controllers/filter-controller.js";
import PointsModel from "../models/points-model.js";
import {MenuItems, AUTHORIZATION, END_POINT} from "../const.js";

import {render, RenderPosition} from "../utils/render.js";

export default class AppController {
  constructor() {
    this._siteMenuContainer = document.querySelector(`.trip-controls`);
    this._siteContentContainer = document.querySelector(`.trip-events`);
    this._bodyContainer = document.querySelector(`.page-main .page-body__container`);

    this._api = new API(END_POINT, AUTHORIZATION);
    this._pointsModel = new PointsModel();

    this._siteMenu = new SiteMenuComponent();
    this._statisticsComponent = new StatisticsComponent();
    this._filterController = new FilterController(this._siteMenuContainer, this._pointsModel);
    this._tripController = new TripController(this._siteContentContainer, this._pointsModel, this._api);
  }

  init() {
    render(this._siteMenuContainer, this._siteMenu, RenderPosition.BEFOREEND);
    this._filterController.render();
    render(this._bodyContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
    this._statisticsComponent.hide();

    document.querySelector(`.trip-main__event-add-btn`)
      .addEventListener(`click`, () => {
        this._tripController.createPoint();
      });

    this._siteMenu.setSiteMenuItemClickHandler((currentSiteMenuItem) => {
      switch (currentSiteMenuItem) {
        case MenuItems.TABLE:
          this._tripController.show();
          this._statisticsComponent.hide();
          break;
        case MenuItems.STATS:
          this._statisticsComponent.show();
          this._tripController.hide();
          break;
      }
    });

    Promise.all(this._api.getAllData())
      .then((values) => {
        this._pointsModel.setPoints(values[0]);
        this._tripController.render();
      });
  }
}
