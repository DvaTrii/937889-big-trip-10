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

export const getDurationTime = (startDate, endDate) => {
  const getFormatNumber = (data, literal) => {
    return data < 10 ? `0` + data + literal : data + literal;
  };
  const days = moment.duration(endDate - startDate).days();
  const hours = moment.duration(endDate - startDate).hours();
  const minutes = moment.duration(endDate - startDate).minutes();

  return (`${days && getFormatNumber(days, `D`) + ` ` || ``}`
    + `${hours && getFormatNumber(hours, `H`) + ` ` || `00H`}`
    + `${minutes && getFormatNumber(minutes, `M`) + ` ` || `00M`}`);
};

// для trip-info
export const customMonth = (data) => {
  return moment(data).format(`MMM`);
};

export const getFormatDate = (data) => {
  return moment(data).format(`DD`);
};

// для фильтра
export const isFutureDate = (date) => date > Date.now();

export const isPastDate = (date) => date < Date.now();
