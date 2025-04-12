// generateData.js - Script to generate random glycemic index data
const fs = require('fs');
const path = require('path');

// Configuration
const COUNT = 100000;
const OUTPUT_PATH = path.join(__dirname, 'data', 'glycemicIndex.json');

// Ensure the directory exists
const dir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Define food categories
const categories = [
  'Fruits', 'Vegetables', 'Grains', 'Dairy', 'Protein Foods',
  'Nuts & Seeds', 'Legumes', 'Beverages', 'Desserts', 'Snacks',
  'Breads', 'Breakfast Foods', 'Pasta', 'Rice & Grains'
];

// Common food prefixes and suffixes to generate variety
const foodPrefixes = ['Fresh', 'Organic', 'Frozen', 'Dried', 'Raw', 'Cooked', 'Grilled', 'Baked', 'Steamed', 'Roasted'];
const foodBaseNames = [
  'Apple', 'Banana', 'Carrot', 'Potato', 'Rice', 'Bread', 'Pasta', 'Milk', 'Yogurt', 'Cheese',
  'Chicken', 'Beef', 'Fish', 'Lentils', 'Beans', 'Nuts', 'Seeds', 'Orange', 'Berries', 'Avocado',
  'Oats', 'Quinoa', 'Barley', 'Corn', 'Tomato', 'Spinach', 'Kale', 'Broccoli', 'Cauliflower',
  'Lettuce', 'Cucumber', 'Onion', 'Garlic', 'Eggplant', 'Zucchini', 'Pumpkin', 'Sweet Potato',
  'Honey', 'Maple Syrup', 'Chocolate', 'Coffee', 'Tea', 'Juice', 'Soda', 'Water', 'Wine', 'Beer',
  'Ice Cream', 'Cake', 'Cookie', 'Pie', 'Donut', 'Muffin', 'Cereal', 'Granola', 'Cracker', 'Chips'
];
const foodSuffixes = ['Salad', 'Soup', 'Stew', 'Juice', 'Smoothie', 'Blend', 'Mix', 'Puree', 'Extract', 'Powder'];

// Common serving sizes
const servingSizes = ['100g', '1 cup', '1 tbsp', '1 tsp', '1 oz', '50g', '200g', '1 piece', '1 slice', '1 fruit', '1/2 cup'];

// Function to generate a random number within a range
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to generate a random food name
function generateFoodName() {
  // Different patterns to create variety
  const pattern = randomInt(1, 4);
  
  switch (pattern) {
    case 1:
      return `${foodPrefixes[randomInt(0, foodPrefixes.length - 1)]} ${foodBaseNames[randomInt(0, foodBaseNames.length - 1)]}`;
    case 2:
      return `${foodBaseNames[randomInt(0, foodBaseNames.length - 1)]} ${foodSuffixes[randomInt(0, foodSuffixes.length - 1)]}`;
    case 3:
      return `${foodBaseNames[randomInt(0, foodBaseNames.length - 1)]}`;
    case 4:
      return `${foodPrefixes[randomInt(0, foodPrefixes.length - 1)]} ${foodBaseNames[randomInt(0, foodBaseNames.length - 1)]} ${foodSuffixes[randomInt(0, foodSuffixes.length - 1)]}`;
  }
}

// Function to generate a food description
function generateDescription(name, gi, category) {
  const descriptions = [
    `${name} with a glycemic index of ${gi}. Common in ${category.toLowerCase()} category.`,
    `A ${category.toLowerCase()} item with moderate nutritional value. Has a GI of ${gi}.`,
    `${name} is a popular choice for those monitoring blood sugar levels. GI: ${gi}.`,
    `This ${category.toLowerCase()} item has a glycemic index of ${gi}.`,
    `A healthy option with a glycemic index rating of ${gi}.`
  ];
  
  return descriptions[randomInt(0, descriptions.length - 1)];
}

console.log(`Generating ${COUNT} food items...`);

// Generate the data
const data = [];
const usedNames = new Set(); // To avoid exact duplicates

for (let i = 0; i < COUNT; i++) {
  // Progress indicator every 10,000 items
  if (i % 10000 === 0) {
    console.log(`Generated ${i} items...`);
  }
  
  let name = generateFoodName();
  
  // Ensure name uniqueness by adding a variant number if needed
  let uniqueNameAttempts = 0;
  while (usedNames.has(name) && uniqueNameAttempts < 5) {
    name = `${name} (Variant ${uniqueNameAttempts + 1})`;
    uniqueNameAttempts++;
  }
  
  usedNames.add(name);
  
  const category = categories[randomInt(0, categories.length - 1)];
  const glycemicIndex = randomInt(1, 100);
  const servingSize = servingSizes[randomInt(0, servingSizes.length - 1)];
  const description = generateDescription(name, glycemicIndex, category);
  
  data.push({
    name,
    glycemicIndex,
    category,
    servingSize,
    description
  });
}

// Write to file
console.log(`Writing data to ${OUTPUT_PATH}...`);
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
console.log(`Successfully generated ${data.length} food items!`);