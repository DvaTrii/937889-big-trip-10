import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-editor.js";
import {render, RenderPosition, replace} from "../utils/render.js";

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onDataChange = onDataChange;
  }

  render(event) {
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    const replaceEventToEdit = () => {
      replace(this._eventEditComponent, this._eventComponent);
    };

    const replaceEditToEvent = () => {
      replace(this._eventComponent, this._eventEditComponent);
    };

    this._eventComponent.setClickHandler(() => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    this._eventEditComponent.setSubmitHandler(replaceEditToEvent());

    render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
  }
}
