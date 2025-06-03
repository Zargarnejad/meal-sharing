import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import {mealsRouter} from "./routers/meals.js";
import {reservationsRouter} from "./routers/reservations.js";
import { reviewsRouter } from "./routers/reviews.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.get("/future-meals", async (req, res) => {
  const FUTURE_MEAL_QUERY = `
  select * from meal 
  where \`when\`> now();
  `;
  const meals = await knex.raw(FUTURE_MEAL_QUERY);
  res.json({ meals });
});

apiRouter.get("/past-meals", async (req, res) => {
  const PAST_MEAL_QUERY = `
  select * from meal 
  where \`when\`< now();
  `;
  const meals = await knex.raw(PAST_MEAL_QUERY);
  res.json({ meals });
});

apiRouter.get("/all-meals", async (req, res) => {
  const ALL_MEAL_QUERY = `
  select * from meal 
  order by id`;
  const meals = await knex.raw(ALL_MEAL_QUERY);
  res.json({ meals });
});

apiRouter.get("/first-meal", async (req, res) => {
  const FIRST_MEAL_QUERY = `
  select * from meal
  order by id asc
  limit 1`;
  const data = await knex.raw(FIRST_MEAL_QUERY);
  checkEmptyResponce(data, res);
});

apiRouter.get("/last-meal", async (req, res) => {
  const LAST_MEAL_QUERY = `
  select * from meal 
  order by id desc
  limit 1`;
  const data = await knex.raw(LAST_MEAL_QUERY);
  checkEmptyResponce(data, res);
});

// Nested routers

apiRouter.use("/meals", mealsRouter);

apiRouter.use("/reservations", reservationsRouter);

apiRouter.use("/reviews", reviewsRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});

function checkEmptyResponce(dbResult, res) {
  const potentialMeal = dbResult[0];
  if (potentialMeal.length == 0) {
    res.status(404);
    res.json({ error: "No meal find in database." });
  } else {
    res.json({ dbResult });
  }
}
