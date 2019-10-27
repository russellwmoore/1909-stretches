function cache(cb) {
  if (typeof cb !== 'function') throw 'Input must be a function.';
  const memo = {};
  return function() {
    const num = arguments[0];

    if (memo[num]) return memo[num];
    else {
      memo[num] = cb(num);
      return memo[num];
    }
  };
}

module.exports = { cache };
