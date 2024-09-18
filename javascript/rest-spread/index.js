// filterAndSort Function
function filterAndSort(filterFn, ...numbers) {
  const filteredNumbers = numbers.filter(filterFn);

  const sortedNumbers = filteredNumbers.sort((a, b) => a - b);

  return sortedNumbers;
}

// Test cases
const isEven = (num) => num % 2 === 0;
console.log(filterAndSort(isEven, 5, 3, 8, 6, 2)); // Output: [2, 6, 8]

// mergeObjects Function
function mergeObjects(...objects) {
  return Object.assign({}, ...objects);
}

// Test cases
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
console.log(mergeObjects(obj1, obj2)); // Output: { a: 1, b: 3, c: 4 }

// combineArrays Function
function combineArrays(...arrays) {
  return [...new Set(arrays.flat())];
}

// Test cases
const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5];
const arr3 = [5, 6, 7];
console.log(combineArrays(arr1, arr2, arr3)); // Output: [1, 2, 3, 4, 5, 6, 7]

// extractProperties Function
function extractProperties(objectsArray, ...propertyNames) {
  return objectsArray.map((obj) => {
    return propertyNames.reduce((acc, prop) => {
      if (prop in obj) {
        acc[prop] = obj[prop];
      }
      return acc;
    }, {});
  });
}

// Test cases
const objects = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 },
];

console.log(extractProperties(objects, "a", "c")); // Output: [{ a: 1, c: 3}, {a: 4, c: 6}]
