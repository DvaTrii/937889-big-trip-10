import {isFutureDate, isPastDate} from '../utils/common.js';
import {FilterType} from '../const.js';

export const getFuturePoints = (points) => {
  points.filter((point) => isFutureDate(point.startDate));
};

export const getPastPoints = (points) => {
  points.filter((point) => isPastDate(point.endDate));
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
