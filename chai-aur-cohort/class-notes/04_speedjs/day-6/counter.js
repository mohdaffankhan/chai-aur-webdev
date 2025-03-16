/**
 * i should have a fn increment()
 * on call of the fn  it should increment the number
 * and return the current counter
 *
 * console.log(increment()); // 1
 * console.log(increment()); // 2
 * console.log(increment()); // 3
 * console.log(increment()); // 4
 *
 */

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const x = createCounter();
const y = createCounter();

console.log(x()); // 1
console.log(x()); // 2
console.log(x()); // 3
console.log(y()); // 1
console.log(y()); // 2
console.log(x()); // 4
console.log(y()); // 3
