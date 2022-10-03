const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const Meal = require("./models/Meal");
const Tag = require("./models/Tag");
const Ingredient = require("./models/Ingredient");

const PORT = 3000;

mongoose.connect("mongodb://localhost/db");

/* In this example, the username is sent as a prameter through the request. Alternatively we can use a session to hold the user's
 username. */

app.get("/meals", async (req, res) => {
  const user = await User.findOne({ Username: req.params.username });
  const meals = (await user.populate("Meals")).Meals;
  res.send(meals);
});

app.get("/tags", async (_req, res) => {
  const tags = await Tag.find({});
  res.send(tags);
});

app.get("/ingredients", async (_req, res) => {
  const ingredients = await Ingredient.find({});
  res.send(ingredients);
});

app.post("/new-meal", async (req, _res) => {
  const user = await User.findOne({ Username: req.params.username });
  const availableTags = await Tag.find({});
  const availableIngredients = await Ingredient.find({});

  const tags = [];
  const ingredients = [];

  for (const tag of req.params.tags) {
    for (const availableTag of availableTags) {
      if (tag === availableTag.name) {
        tags.push(tag);
        break;
      }
    }
  }

  for (const foodItem of req.params.ingredients) {
    for (const availableFoodItem of availableIngredients) {
      if (foodItem === availableFoodItem.name) {
        ingredients.push(foodItem);
        break;
      }
    }
  }

  const meal = await new Meal({
    LogID: user.Meals.length,
    Timestamp: Date.now(),
    UserID: user.id,
    Tags: tags,
    Ingredients: ingredients,
  });

  meal.save();

  user.Meals.push(meal);
  user.save();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
