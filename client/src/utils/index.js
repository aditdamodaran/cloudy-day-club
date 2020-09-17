import color from 'color';

// Convert color in format [R, G, B] to Hex
export const rgbToHex = ([r, g, b]) => {
  const converter = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  return "#" + converter(r) + converter(g) + converter(b);
}

// Calculate whether player text should be light or dark
export const calcTextColor = (bgColor) => color.rgb(bgColor).isDark()

// Get the query params off the window's URL
export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

// Higher-order function for async/await error handling
export const catchErrors = fn => {
  return function(...args) {
    return fn(...args).catch(err => {
      console.error(err);
    });
  };
};
