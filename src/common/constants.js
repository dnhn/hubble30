export const SITE_TITLE = 'Hubble30 — What did Hubble see on your birthday?';

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
