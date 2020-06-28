import {isFutureDate, isPastDate} from '../utils/common.js';
import {FilterType} from '../const.js';

export const getFuturePoints = (points) => {
  return points.filter((point) => isFutureDate(point.startDate));
};

export const getPastPoints = (points) => {
  return points.filter((point) => isPastDate(point.startDate));
};

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FilterType.PAST:
      return getPastPoints(points);
    case FilterType.FUTURE:
      return getFuturePoints(points);
  }
  return points;
};
