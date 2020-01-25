import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-editor.js";
import {render, RenderPosition, replace} from "../utils/render.js";

export default class PointController {
  constructor(container, event) {
    this._container = container;
    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);
  }

  render() {
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const dayEvent = this._eventComponent;
    const dayEditEvent = this._eventEditComponent;

    const replaceEventToEdit = () => {
      replace(dayEditEvent, dayEvent);
    };

    const replaceEditToEvent = () => {
      replace(dayEvent, dayEditEvent);
    };

    dayEvent.setClickHandler(() => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    dayEditEvent.setSubmitHandler(replaceEditToEvent());

    render(this._container, dayEvent, RenderPosition.BEFOREEND);
  }
}
