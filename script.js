let fruits = ['apple', 'banana', 'orange'];

// Using a for loop
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Using a for-of loop
for (let fruit of fruits) {
  console.log(fruit);
}

// Using a forEach method
fruits.forEach(function(fruit) {
  console.log(fruit);
});
