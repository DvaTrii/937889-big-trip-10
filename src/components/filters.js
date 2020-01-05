import AbstractComponent from "./abstract-component.js";

const createFilterMarkup = (filter) =>{
  const {name, isChecked} = filter;

  return (
    `<div class="trip-filters__filter">
        <input id="filter-${name.toLowerCase()}"
        class="trip-filters__filter-input visually-hidden"
        type="radio" name="trip-filter"
        value="${name.toLowerCase()}"
        ${isChecked ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${name.toLowerCase()}">${name}</label>
      </div>`
  );
};

const createFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);

  return (
    `<div>
       <h2 class="visually-hidden">Filter events</h2>
       <form class="trip-filters" action="#" method="get">
          ${filtersMarkup}
          <button class="visually-hidden" type="submit">Accept filter</button>
       </form>
     </div>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }
}
