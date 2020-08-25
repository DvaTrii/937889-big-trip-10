export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.place = data[`destination`][`name`];
    this.startDate = new Date(data[`date_from`]).getTime();
    this.endDate = new Date(data[`date_to`]).getTime();
    this.price = Number(data[`base_price`]);
    this.offers = data[`offers`];
    this.description = data[`destination`][`description`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.photos = data[`destination`][`pictures`];
  }

  toRAW() {
    return {
      base_price: Number(this.price),
      date_from: new Date(this.startDate).toISOString(),
      date_to: new Date(this.endDate).toISOString(),
      destination: {
        description: this.description,
        name: this.place,
        pictures: this.photos
      },
      id: this.id,
      is_favorite: this.isFavorite,
      offers: this.offers,
      type: this.type,
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }

}
