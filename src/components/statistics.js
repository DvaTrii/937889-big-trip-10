import AbstractSmartComponent from "./abstract-smart-component.js";

const creatStatisticsTemplate = () => {
  return `<h2>It works</h2>>`;
};

export default class Statistics extends AbstractSmartComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return creatStatisticsTemplate();
  }
}
