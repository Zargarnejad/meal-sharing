import express from "express";
import knex from "../database_client.js";
import { validateId } from "./middlewares.js";

export const reviewsRouter = express.Router();


reviewsRouter.get("/", async (req, res) => {
  const allReviews = await knex("review");
  res.json({ allReviews });
});

reviewsRouter.post("/", async (req, res) => {
  const { title, description, meal_id, stars } =
    req.body;
  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a string." });
  }

  try {
    await knex("review").insert({
        title, description, meal_id,stars, created_date: new Date(),
    });
    res.status(201).json({ message: "A new review added!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failded to add a review." });
  }
});

reviewsRouter.get("/:id", validateId, async (req, res) => {
  const { id } = req.params;
  try {
    const selectedReview = await knex("review").where({ id });
    if (selectedReview === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(selectedReview);
  } catch (err) {
    res.status(500).json({ error: " Failed to find a review" });
  }
});

reviewsRouter.put("/:id", validateId, async (req, res) => {
  const { id } = req.params;
  const { title, description, meal_id, stars } = req.body;

  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a string." });
  }
  
  try {
    const updatedMeal = await knex("review").where({ id }).update({
      title,
      description,
      meal_id,
      stars
    });
    res.status(200).json({ message: "A meal updated!", updatedMeal });
  } catch (err) {
    res.status(500).json({ error: " Failed to update a meal" });
  }
});

reviewsRouter.delete("/:id", validateId, async (req, res) => {
  try {
    const deletedReview = await knex("review").where({ id: req.params.id }).del();
    res.json({ message: `Review with id ${req.params.id} deleted.` });
  } catch (err) {
    res.status(500).json({ error: " Failed to delete a review" });
  }
});
