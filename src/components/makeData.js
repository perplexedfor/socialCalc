import { faker } from '@faker-js/faker';

// Function to create an array of numbers from 0 to len - 1
const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// Function to create a new person with random data
const newPerson = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ max: 40 }), // Updated for newer faker version
    visits: faker.number.int({ max: 1000 }), // Updated for newer faker version
    progress: faker.number.int({ max: 100 }), // Updated for newer faker version
    status: faker.helpers.arrayElement([
      'relationship',
      'complicated',
      'single',
    ]),
  };
};

// Function to generate data with a specified depth
export function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(() => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
