import moment from 'moment';

//  дата для event-edit
export const formatDateTime = (data) => {
  return moment(data).format(`DD/MM/YY HH:mm`);
};

//  дата для event-time
export const castDateTime = (data) => {
  return moment(data).format(`YYYY-MM-DDTHH:mm`);
};

//  дата для daydate контейнера дня
export const castDate = (data) => {
  return moment(data).format(`YYYY-MM-DD`);
};

//  дата для разметки дня с индексом
export const castomDate = (data) => {
  return moment(data).format(`MMM DD`);
};

// время для разметки в event
export const customTime = (data) => {
  return moment(data).format(`HH:mm`);
};

export const durationTime = (startDate, endDate) => {
  return (`${moment(endDate).diff(moment(startDate), `hours`)}` + `H` + ` ` + `${moment(endDate - startDate).format(`mm`)}` + `M`);
};

// для trip-info
export const customMonth = (data) => {
  return moment(data).format(`MMM`);
};

export const getFormatDate = (data) => {
  return moment(data).format(`DD`);
};
