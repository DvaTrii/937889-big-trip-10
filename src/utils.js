export const dateGoodLooking = (date) => {
  if (date < 10) {
    date = `0` + date;
  }

  return date;
};

export const createElement = (template) => {
  const el = document.createElement(`div`);
  el.innerHTML = template;
  return el.firstChild;
};

export const renderElement = (container, element) => {
  return container.appendChild(element);
};
