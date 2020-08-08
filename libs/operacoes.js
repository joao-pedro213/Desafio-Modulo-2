function arraySum(array) {
  const sumResult = array.reduce((previous, current) => {
    return previous + current;
  });

  return sumResult;
}

export { arraySum };
