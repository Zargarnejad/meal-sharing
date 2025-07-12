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
  let query = knex.select("*").from("meal");

  const availableReservations = req.query.availableReservations;
  if (availableReservations !== undefined) {
    query = knex("meal as m")
      .leftJoin(
        // Subquery to fetch the sum of all reservations for each meal
        knex("reservation as r")
          .select("r.meal_id")
          .sum("number_of_guests as current_reservation_count")
          .groupBy("r.meal_id")
          .as("res"),
        "m.id",
        "res.meal_id"
      )
      .select("m.*");

    if (availableReservations === "true") {
      query = query.where(function () {
        this.whereNull("res.current_reservation_count").orWhere(
          "res.current_reservation_count",
          "<",
          "m.max_reservations"
        );
      });
    } else if (availableReservations === "false") {
      query = query.where(function () {
        this.whereNotNull("res.current_reservation_count").andWhere(
          "res.current_reservation_count",
          ">=",
          "m.max_reservations"
        );
      });
    } else {
      return res
        .status(400)
        .send("availableReservations must be eiher 'true' or 'false'");
    }
  }

  const maxPrice = Number(req.query.maxPrice);
  if (maxPrice) {
    if (!isNaN(maxPrice) && maxPrice > 0) {
      query = query.whereBetween("price", [0, maxPrice]);
    } else {
      return res.status(400).send("maxPrice must be a positive number");
    }
  }

  const title = req.query.title;
  if (typeof title === "string") {
    if (title.length > 0) {
      query = query.where("title", "like", `%${title}%`);
    } else {
      return res.status(400).send("title can not be empty");
    }
  }

  const dateAfter = req.query.dateAfter;
  if (dateAfter) {
    const isValidDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(dateAfter);
    const isValidDate = !isNaN(Date.parse(dateAfter));

    if (!isValidDateFormat || !isValidDate) {
      return res
        .status(400)
        .json({ error: "dateAfter must be in YYYY-MM-DD format" });
    } else {
      query = query.where('"when"', ">", dateAfter);
    }
  }

  const dateBefore = req.query.dateBefore;
  if (dateBefore) {
    const isValidDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(dateBefore);
    const isValidDate = !isNaN(Date.parse(dateBefore));

    if (!isValidDateFormat || !isValidDate) {
      return res
        .status(400)
        .json({ error: "dateBefore must be in YYYY-MM-DD format" });
    } else {
      query = query.where('"when"', "<", dateBefore);
    }
  }

  let sortKey = req.query.sortKey;
  if (typeof sortKey === "string") {
    const validColumns = ["when", "max_reservations", "price"];
    if (validColumns.includes(sortKey)) {
      if (sortKey === "when") {
        sortKey = '"when"';
      }

      let sortDir = req.query.sortDir;
      if (typeof sortDir === "string") {
        const sortDirValues = ["asc", "desc"];
        if (!sortDirValues.includes(sortDir)) {
          return res.status(400).json({ error: "sortDir value not recognize" });
        }
      } else {
        sortDir = "asc";
      }

      query = query.orderByRaw(`${sortKey} ${sortDir}`);
    } else {
      return res.status(400).json({ error: "sortKey value not recognize" });
    }
  }

  const limit = Number(req.query.limit);
  if (limit) {
    if (!isNaN(limit) && limit > 0) {
      query = query.limit(limit);
    } else {
      return res.status(400).send("limit must be a positive number");
    }
  }

  console.log("SQL:", query.toSQL().sql);
  const results = await query;
  res.json({ results });
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
    return res.status(400).json({
      error:
        "max_reservations must be an integer and should be greater than 0.",
    });
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
    const selectedMeal = await knex("meal as m")
      .leftOuterJoin(
        // Subquery to fetch the sum of all reservations for each meal
        knex("reservation as r")
          .select("r.meal_id")
          .sum("number_of_guests as current_reservation_count")
          .groupBy("r.meal_id")
          .as("res"),
        "m.id",
        "res.meal_id"
      )
      .where({ id })
      .select("m.*", "res.current_reservation_count");
    if (selectedMeal === 0) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.json(selectedMeal);
  } catch (err) {
    console.log(err);
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

mealsRouter.get("/:meal_id/reviews", async (req, res) => {
  const { meal_id } = req.params;
  const numId = Number(meal_id);
  if (!Number.isInteger(numId) || numId <= 0) {
    return res
      .status(400)
      .json({ error: "meal_id must be a number greater than 0." });
  }
  try {
    const selectedReview = await knex("review").where({ meal_id });
    if (selectedReview === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(selectedReview);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: " Failed to find a review" });
  }
});
