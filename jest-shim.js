global.fetch = require('jest-fetch-mock');

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
