import moment from 'moment';
import {monthNames} from "../const";

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

// время для разметки в event
export const customTime = (data) => {
  const [hours, minutes] = getNormDate(data).slice(3);
  return `${hours}:${minutes}`;
};

export const durationTime = (startDate, endDate) => {
  return `${getNormDate(endDate - startDate).slice(3, 4)}H ${getNormDate(endDate - startDate).slice(4)}M`;
};
