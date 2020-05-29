function createArray(start, end) {
  let array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}


function assignDec (n) {
  if (n >= 1 && n <= 9) return 'c0';
  else if (n >= 10 && n <= 19) return 'c1';
  else if (n >= 20 && n <= 29) return 'c2';
  else if (n >= 30 && n <= 39) return 'c3';
  else if (n >= 40 && n <= 49) return 'c4';
  else if (n >= 50 && n <= 59) return 'c5';
  else if (n >= 60 && n <= 69) return 'c6';
  else if (n >= 70 && n <= 79) return 'c7';
  else if (n >= 80 && n <= 90) return 'c8';
}

function randomN(array) {
  let index = Math.round(Math.random()*(array.length-1));
  return array[index];
}

export {createArray, assignDec, randomN};
