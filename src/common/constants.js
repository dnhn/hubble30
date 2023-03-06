export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const DAYS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
];

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const INVALID_DATES = [
  '2-30',
  '2-31',
  '4-31',
  '6-31',
  '9-31',
  '11-31',
];

export const ERROR_MESSAGES = {
  EMPTY_DATE: 'Empty input. Please select month and day.',
  INVALID_DATE: 'Invalid input. Please select a valid date.',
};

export const ENDPOINTS = {
  GET_IMAGE: id => `.netlify/functions/getImage?id=${id}`,
};

export const SITE = 'https://imagine.gsfc.nasa.gov/hst_bday/';
