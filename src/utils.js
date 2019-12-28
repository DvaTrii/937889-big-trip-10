const castDateFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const getNormDate = (data) => {
  const date = castDateFormat(new Date(data).getDate());
  const month = castDateFormat(new Date(data).getMonth() + 1);
  const year = castDateFormat(new Date(data).getFullYear());
  const hours = castDateFormat(new Date(data).getHours());
  const minutes = castDateFormat(new Date(data).getMinutes());

  return [date, month, year, hours, minutes];
};

export const getDateFromStr = (data) => {
  const msData = Date.parse(data);
  const date = castDateFormat(new Date(msData).getDate());
  const month = new Date(msData).getMonth();
  const year = castDateFormat(new Date(msData).getFullYear());
  return [date, month, year];
};

export const createElement = (template) => {
  const el = document.createElement(`div`);
  el.innerHTML = template;
  return el.firstChild;
};

export const renderElement = (container, element) => {
  return container.appendChild(element);
};
