// https://stackoverflow.com/a/1527820/2571493
export const randomRange = (mn, mx) => {
  const min = Math.ceil(mn);
  const max = Math.floor(mx);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
