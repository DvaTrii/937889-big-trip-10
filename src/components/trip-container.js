import AbstractComponent from "./abstract-component.js";

const createTripContainerTemplate = () => {
  return (`<ul class="trip-days"></ul>`);
};

export default class TripContainer extends AbstractComponent {
  getTemplate() {
    return createTripContainerTemplate();
  }
}
