export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.place = data[`destination`][`name`];
    this.startDate = new Date(data[`date_from`]).getTime();
    this.endDate = new Date(data[`date_to`]).getTime();
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
