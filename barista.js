const drinks = [
  {
    id: 1,
    name: "Caffe Americano",
    recipe: { Espresso: 3 },
    //cost: 3.30,
  },
  {
    id: 2,
    name: "Caffe Latte",
    recipe: { Espresso: 2, "Steamed Milk": 1 },
    //cost: 2.55,
  },
  {
    id: 3,
    name: "Caffe Mocha",
    recipe: { Espresso: 1, Cocoa: 1, "Steamed Milk": 1, "Whipped Cream": 1 },
    //cost: 3.35,
  },
  {
    id: 4,
    name: "Cappuccino",
    recipe: { Espresso: 2, "Steamed Milk": 1, "Foamed Milk": 1 },
    //cost: 2.90,
  },
  {
    id: 5,
    name: "Coffee",
    recipe: { Coffee: 3, Sugar: 1, Cream: 1 },
    //cost: 2.75,
  },
  {
    id: 6,
    name: "Decaf Coffee",
    recipe: { "Decaf Coffee": 3, Sugar: 1, Cream: 1 },
    //cost: 2.75,
  },
];

const mainIngredients = {
  Coffee: { cost: 0.75, quantity: 10 },
  "Decaf Coffee": { cost: 0.75, quantity: 10 },
  Sugar: { cost: 0.25, quantity: 10 },
  Cream: { cost: 0.25, quantity: 10 },
  "Steamed Milk": { cost: 0.35, quantity: 10 },
  "Foamed Milk": { cost: 0.35, quantity: 10 },
  Espresso: { cost: 1.1, quantity: 10 },
  Cocoa: { cost: 0.9, quantity: 10 },
  "Whipped Cream": { cost: 1.0, quantity: 10 },
};

let ingredients = { ...mainIngredients };

// let ingredients = {
//   Coffee: { cost: 0.75, quantity: 10 },
//   "Decaf Coffee": { cost: 0.75, quantity: 10 },
//   Sugar: { cost: 0.25, quantity: 10 },
//   Cream: { cost: 0.25, quantity: 10 },
//   "Steamed Milk": { cost: 0.35, quantity: 10 },
//   "Foamed Milk": { cost: 0.35, quantity: 10 },
//   Espresso: { cost: 1.1, quantity: 10 },
//   Cocoa: { cost: 0.9, quantity: 10 },
//   "Whipped Cream": { cost: 1.0, quantity: 10 },
// };

function printInventory() {
  console.log("Inventory:");
  for (const key in ingredients) {
    console.log(`${key},${ingredients[key].quantity}`);
  }
  printMenu();
}

function printMenu() {
  console.log("Menu:");
  for (let i = 0; i < drinks.length; i++) {
    const drink = drinks[i];
    console.log(
      `${drink.id},${drink.name},$${calculateCost(drink)},${inStock(drink)}`
    );
  }
}

const calculateInventory = (drink) => {
  if (!drink) return false;

  if (!inStock(drink)) {
    console.log(`Out of stock: ${drink.name}`);
    return false;
  }

  ingredients = Object.entries(drink.recipe).reduce(
    (acc, [key, qty]) => {
      acc[key] = { ...acc[key], quantity: acc[key].quantity - qty };
      return acc;
    },
    { ...ingredients }
  );

  console.log(`Dispensed: ${drink.name}`);
  return true;
};

const restock = () => {
  // const newIngredients = {};
  // for (const key in ingredients) {
  //   newIngredients[key] = { ...ingredients[key], quantity: 10 };
  // }
  // ingredients = newIngredients;

  ingredients = { ...mainIngredients };
  console.log("Restocked all ingredients to 10.");
};

const start = () => {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Enter your command:");

  rl.on("line", (input) => {
    switch (input.toLowerCase()) {
      case "q":
        console.log("Exiting...");
        rl.close();
        break;
      case "r":
        restock();
        printInventory();
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6": {
        const drink = drinks.find((d) => d.id.toString() === input);
        if (calculateInventory(drink)) printInventory();
        break;
      }
      default:
        console.log("Invalid selection:", input);
        printInventory();
        console.log("Enter your command:");
        break;
    }
  });
};

const calculateCost = ({ recipe }) =>
  Object.entries(recipe)
    .reduce((total, [key, qty]) => {
      const ingredient = ingredients[key];
      return total + (ingredient ? ingredient.cost * qty : 0);
    }, 0)
    .toFixed(2);

printInventory();
start();

function inStock(drink) {
  for (const key in drink.recipe) {
    if (ingredients[key].quantity < drink.recipe[key]) {
      return false;
    }
  }
  return true;
}

//use switch instead of if-else
//use .reduce in cost and inventory calculations
//try to get rid of for loops
//use spread operators and destructuring
//create a restock function
