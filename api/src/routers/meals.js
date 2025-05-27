import express from "express";
import knex from "../database_client.js";
import { validateId } from "./middlewares.js";

export const mealsRouter = express.Router();


// check the date for "when"
const isFutureDate = (dateStr) => {
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && date > new Date();
};

mealsRouter.get("/", async (req, res) => {
  const allMeals = await knex("meal");
  res.json({ allMeals });
});

mealsRouter.post("/", async (req, res) => {
  const { title, description, location, when, max_reservations, price } =
    req.body;
  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a string." });
  }

  if (!isFutureDate(when)) {
    return res
      .status(400)
      .json({ error: "'when' must be a valid future date." });
  }

  if (
    max_reservations === undefined ||
    !Number.isInteger(max_reservations) ||
    max_reservations <= 0
  ) {
    return res
      .status(400)
      .json({ error: "max_reservations must be an integer and should be greater than 0." });
  }
  if (price === undefined || typeof price !== "number" || price <= 0) {
    return res
      .status(400)
      .json({ error: "Price must be a number greater than 0." });
  }

  try {
    await knex("meal").insert({
      title,
      description,
      location,
      when,
      max_reservations,
      price,
      created_date: new Date(),
    });
    res.status(201).json({ message: "A new meal added!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failded to add a meal" });
  }
});

mealsRouter.get("/:id", validateId, async (req, res) => {
    const { id } = req.params;
  try {
    const selectedMeal = await knex("meal").where({ id });
    if (selectedMeal === 0) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.json(selectedMeal);
  } catch (err) {
    res.status(500).json({ error: " Failed to find a meal" });
  }
});

mealsRouter.put("/:id", validateId, async (req, res) => {
  const { id } = req.params;
  const { title, description, location, when, max_reservations, price } =
    req.body;

  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a string." });
  }
  if (!isFutureDate(when)) {
    return res
      .status(400)
      .json({ error: "'when' must be a valid future date." });
  }
  if (
    max_reservations === undefined ||
    !Number.isInteger(max_reservations) ||
    max_reservations <= 0
  ) {
    return res
      .status(400)
      .json({ error: "max_reservations must be an integer greater than 0." });
  }
  if (price === undefined || typeof price !== "number" || price <= 0) {
    return res
      .status(400)
      .json({ error: "Price must be a number greater than 0." });
  }

  try {
    const updatedMeal = await knex("meal").where({ id }).update({
      title,
      description,
      location,
      when,
      max_reservations,
      price,
    });
    res.status(200).json({ message: "A meal updated!", updatedMeal });
  } catch (err) {
    res.status(500).json({ error: " Failed to update a meal" });
  }
});

mealsRouter.delete("/:id", validateId, async (req, res) => {
  try {
    const deletedMeal = await knex("meal").where({ id: req.params.id }).del();
    res.json({ message: `Meal with id ${req.params.id} deleted.` });
  } catch (err) {
    res.status(500).json({ error: " Failed to delete a meal" });
  }
});
