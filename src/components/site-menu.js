import AbstractComponent from "./abstract-component.js";
import {MenuItems} from "../const.js";

const createMenuItemsMarkup = (menuItems) => {
  return menuItems.map((menuItem) => {
    return (
      `<a class="trip-tabs__btn" href="#">${menuItem}</a>`
    );
  }).join(`\n`);
};

const createSiteMenuTemplate = (menuItems) => {
  return (
    `<div>
       <h2 class="visually-hidden">Switch trip view</h2>
       <nav class="trip-controls__trip-tabs  trip-tabs">
          ${createMenuItemsMarkup(menuItems)}
       </nav>
     </div>`
  );
};

export default class SiteMenu extends AbstractComponent {
  getTemplate() {
    return createSiteMenuTemplate(Array.from(Object.values(MenuItems)));
  }
}
