import AbstractComponent from "./abstract-component.js";

const createEventContainerTemplate = () => {
  return (`<li class="trip-events__item"></li>`);
};

export default class EventContainer extends AbstractComponent {
  getTemplate() {
    return createEventContainerTemplate();
  }
}
