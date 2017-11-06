export default (context, selectors) => {
  let shouldRender = false;

  // Make sure proper context exists
  for (let j = 0; j < selectors.length; j += 1) {
    if (shouldRender) {
      break;
    }
    const selector = selectors[j];
    shouldRender = selector.reduce((valid, key) => {
      return valid && Object.prototype.hasOwnProperty.call(
        context,
        key,
      );
    }, true);
  }

  return shouldRender;
};
