import AbstractComponent from "./abstract-component.js";
import {MenuItems} from "../const.js";

const ACTIVE_MENU_ITEM_CLASS = `trip-tabs__btn--active`;

const createSiteMenuItemsMarkup = (menuItems, currentSiteMenuItem) => {
  return menuItems.map((menuItem) => {
    return (
      `<a class="trip-tabs__btn ${menuItem === currentSiteMenuItem ? ACTIVE_MENU_ITEM_CLASS : ``}" href="#">${menuItem}</a>`
    );
  }).join(`\n`);
};

const createSiteMenuTemplate = (menuItems, currentSiteMenuItem) => {
  return (
    `<div>
       <h2 class="visually-hidden">Switch trip view</h2>
       <nav class="trip-controls__trip-tabs  trip-tabs">
          ${createSiteMenuItemsMarkup(menuItems, currentSiteMenuItem)}
       </nav>
     </div>`
  );
};

export default class SiteMenu extends AbstractComponent {
  constructor() {
    super();

    this._currentSiteMenuItem = MenuItems.TABLE;
  }

  getTemplate() {
    return createSiteMenuTemplate(Array.from(Object.values(MenuItems)), this._currentSiteMenuItem);
  }

  setSiteMenuItemClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      this._currentSiteMenuItem = MenuItems[evt.target.textContent.toUpperCase()];

      handler(this._currentSiteMenuItem);

      this._setItemActiveClass(evt.target);
    });
  }

  _setItemActiveClass(item) {
    const menuItems = Array.from(this.getElement().querySelectorAll(`.trip-tabs__btn`));

    menuItems.forEach((menuItem) => {
      menuItem.classList.remove(ACTIVE_MENU_ITEM_CLASS);
    });

    item.classList.add(ACTIVE_MENU_ITEM_CLASS);
  }
}
