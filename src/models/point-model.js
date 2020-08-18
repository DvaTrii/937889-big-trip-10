export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.place = data[`destination`][`name`];
    this.startDate = data[`date_from`];
    this.endDate = data[`date_to`];
    this.price = data[`base_price`];
    this.offers = data[`offers`];
    this.description = data[`destination`][`description`];
    this.isFavorite = data[`is_favorite`];
    this.photos = data[`destination`][`pictures`];
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

}
