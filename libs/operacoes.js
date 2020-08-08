function arraySum(array) {
  const sumResult = array.reduce((previous, current) => {
    return previous + current;
  });

  return sumResult;
}

function arrayAvg(array) {
  const sumResult = arraySum(array);
  const avgResult = sumResult / array.length;

  return avgResult;
}

export { arraySum, arrayAvg };
