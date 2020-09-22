export default class Store {
  static setDestinations(items) {
    Store._destinations = items;
  }

  static setOffers(items) {
    Store._offers = items;
  }

  static getDestinations() {
    return Store._destinations;
  }

  static getOffers() {
    return Store._offers;
  }
}
