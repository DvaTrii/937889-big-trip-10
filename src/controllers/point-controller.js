import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import {render, remove, replace, RenderPosition} from "../utils/render.js";
import PointContainer from '../components/event-container.js';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const newEventButton = document.querySelector(`.trip-main__event-add-btn`);

const INPUT_NAME_PREFIX = `event-offer-`;

const getOfferNameByInputName = (name) => {
  return name.substring(INPUT_NAME_PREFIX.length);
};

export const EmptyPoint = {
  type: `taxi`,
  place: ``,
  startDate: Date.now(),
  endDate: Date.now(),
  price: ``,
  offers: [],
  description: ``,
  isFavorite: false,
  photos: []
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._pointContainer = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point, mode) {
    this._pointContainer = new PointContainer();
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(point);
    this._eventEditComponent = new EventEditComponent(point, mode);

    this._eventComponent.setRollupButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setRollupButtonClickHandler(() => {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      point.isFavorite = !point.isFavorite;
    });

    this._eventEditComponent.setOfferButtonClickHandler((evt) => {
      evt.target.toggleAttribute(`checked`);

      const offerName = getOfferNameByInputName(evt.target.name);

      point.offers.forEach((it) => {
        if (evt.target.tagName === `INPUT` && it.offerType === offerName) {
          it.isChecked = evt.target.checked;
        }
      });
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._eventEditComponent.getData();
      this._onDataChange(this, point, data);
      newEventButton.disabled = false;
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      this._onDataChange(this, point, null);
      newEventButton.disabled = false;
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
          this._replaceEditToEvent();
        } else {
          render(this._container, this._pointContainer, RenderPosition.BEFOREEND);
          render(this._pointContainer.getElement(), this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEventEditComponent && oldEventComponent) {
          remove(oldEventComponent);
          remove(oldEventEditComponent);
        }
        this._eventEditComponent.reset();
        this._onViewChange();
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(document.querySelector(`.trip-days`), this._eventEditComponent, RenderPosition.AFTERBEGIN);
        newEventButton.disabled = true;
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEventToEdit() {
    this._onViewChange();

    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }

      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      newEventButton.disabled = false;
    }
  }
}
