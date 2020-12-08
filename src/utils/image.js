export const preload = (src, callback) => {
  const img = new Image();
  img.src = src;
  img.onload = callback;
};
