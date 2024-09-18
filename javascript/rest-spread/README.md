# rest-spread

## Description

You are tasked with creating a utility library for handling various operations on arrays and objects. You need to write several functions that use both the rest and spread operators.

**filterAndSort Function**: Create a function called filterAndSort that takes an indefinite number of arguments. The first argument should be a filter function, and the remaining arguments should be numbers. The function should:

- Use the rest operator to capture all arguments except the first one.
- Filter the numbers using the provided filter function.
- Sort the filtered numbers in ascending order.
- Return the sorted array of numbers.

**mergeObjects Function**: Create a function called mergeObjects that accepts an indefinite number of objects. The function should:

- Use the spread operator to merge all objects into one.
- Ensure that if multiple objects contain the same key, the last object's value for that key should be used.
- Return the merged object.

**combineArrays Function**: Create a function called combineArrays that takes multiple arrays as arguments. The function should:

- Use the spread operator to combine all arrays into one.
- Remove duplicate elements from the combined array.
- Return the new array with unique elements.

**extractProperties Function**: Create a function named extractProperties that accepts the following:

- An array of objects.
- A list of property names.

The function should:

- Use the spread operator to create a new array of objects with only the specified properties.
- Return the new array of objects.
