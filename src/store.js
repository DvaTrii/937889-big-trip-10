export default class Store {
  constructor() {
    this._destinations = null;
    this._offers = null;
  }

  static setDestinations(items) {
    this._destinations = items;
  }

  static setOffers(items) {
    this._offers = items;
  }

  static getDestination() {
    return this._destinations;
  }

  static getOffers() {
    return this._offers;
  }
}
