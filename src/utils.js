import {monthNames} from "./const";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const castDateFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const getNormDate = (data) => {
  const date = castDateFormat(new Date(data).getDate());
  const month = castDateFormat(new Date(data).getMonth() + 1);
  const year = castDateFormat(new Date(data).getFullYear());
  const hours = castDateFormat(new Date(data).getHours());
  const minutes = castDateFormat(new Date(data).getMinutes());

  return [date, month, year, hours, minutes];
};

const getDateFromStr = (data) => {
  const msData = Date.parse(data);
  const date = castDateFormat(new Date(msData).getDate());
  const month = new Date(msData).getMonth();
  const year = castDateFormat(new Date(msData).getFullYear());
  return [date, month, year];
};

//  дата для event-edit
export const formatDateTime = (data) => {
  const [date, month, year, hours, minutes] = getNormDate(data);
  return `${date}/${month}/${year % 100} ${hours}:${minutes}`;
};

//  дата для event-time
export const castDateTime = (data) => {
  const [date, month, year, hours, minutes] = getNormDate(data);
  return `${year}-${month}-${date}T${hours}:${minutes}`;
};

//  дата для daydate контейнера дня
export const castDate = (data) => {
  const [dateNum, month, year] = getDateFromStr(data);
  return `${year}-${month + 1}-${dateNum}`;
};

//  дата для разметки дня с индексом
export const castomDate = (data) => {
  const [dateNum, month] = getDateFromStr(data);
  return `${monthNames[month]} ${dateNum}`;
};

export const createElement = (template) => {
  const el = document.createElement(`div`);
  el.innerHTML = template;
  return el.firstChild;
};
//
// export const renderElement = (container, element) => {
//   return container.appendChild(element);
// };

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
