// Test to verify cart calculation fix
const items = [
  { price: 5999, quantity: 10 }
];

// Simulate the old calculation (with potential floating point issues)
const oldCalculation = () => {
  const exchangeRate = 1; // USD
  const localizedTotal = items.reduce((total, item) => {
    const localPrice = Math.round(item.price * exchangeRate * 100) / 100;
    return total + (localPrice * item.quantity);
  }, 0);
  return localizedTotal / exchangeRate;
};

// Simulate the new calculation (direct calculation for USD)
const newCalculation = () => {
  return Math.round(
    items.reduce((total, item) => total + item.price * item.quantity, 0) * 100
  ) / 100;
};

// Expected result
const expected = 5999 * 10; // 59990

console.log('=== Cart Calculation Fix Test ===');
console.log(`Items: ${JSON.stringify(items)}`);
console.log(`Expected: ${expected}`);
console.log(`Old calculation: ${oldCalculation()}`);
console.log(`New calculation: ${newCalculation()}`);
console.log(`Old matches expected: ${oldCalculation() === expected}`);
console.log(`New matches expected: ${newCalculation() === expected}`);

// Test with multiple items
const multipleItems = [
  { price: 5999, quantity: 5 },
  { price: 5999, quantity: 5 }
];

const oldMultiple = () => {
  const exchangeRate = 1;
  const localizedTotal = multipleItems.reduce((total, item) => {
    const localPrice = Math.round(item.price * exchangeRate * 100) / 100;
    return total + (localPrice * item.quantity);
  }, 0);
  return localizedTotal / exchangeRate;
};

const newMultiple = () => {
  return Math.round(
    multipleItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100
  ) / 100;
};

console.log('\n=== Multiple Items Test ===');
console.log(`Multiple items: ${JSON.stringify(multipleItems)}`);
console.log(`Expected: ${expected}`);
console.log(`Old calculation: ${oldMultiple()}`);
console.log(`New calculation: ${newMultiple()}`);
console.log(`Old matches expected: ${oldMultiple() === expected}`);
console.log(`New matches expected: ${newMultiple() === expected}`);

// Test with floating point numbers
const floatItems = [
  { price: 59.99, quantity: 10 }
];

const oldFloat = () => {
  const exchangeRate = 1;
  const localizedTotal = floatItems.reduce((total, item) => {
    const localPrice = Math.round(item.price * exchangeRate * 100) / 100;
    return total + (localPrice * item.quantity);
  }, 0);
  return localizedTotal / exchangeRate;
};

const newFloat = () => {
  return Math.round(
    floatItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100
  ) / 100;
};

console.log('\n=== Floating Point Test ===');
console.log(`Float items: ${JSON.stringify(floatItems)}`);
console.log(`Expected: ${59.99 * 10}`);
console.log(`Old calculation: ${oldFloat()}`);
console.log(`New calculation: ${newFloat()}`);
console.log(`Old matches expected: ${oldFloat() === 59.99 * 10}`);
console.log(`New matches expected: ${newFloat() === 59.99 * 10}`);

// Test the exact scenario: 10 items at 5999 each
console.log('\n=== Exact Scenario Test ===');
console.log('10 items at 5999 each:');
console.log(`Direct calculation: ${5999 * 10}`);
console.log(`With Math.round: ${Math.round(5999 * 10 * 100) / 100}`);
console.log(`Without Math.round: ${5999 * 10}`);
