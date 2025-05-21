import express from "express";
import knex from "../database_client.js";

const reservationsRouter = express.Router();

reservationsRouter.get("/", async (req, res) => {
  const allReservations = await knex("reservation");
  res.json({ allReservations });
});

reservationsRouter.post("/", async (req, res) => {
  const {
    id,
    number_of_guests,
    meal_id,
    created_date,
    contact_phonenumber,
    contact_name,
    contact_email,
  } = req.body;
  try {
    await knex("reservation").insert({
      id,
      number_of_guests,
      meal_id,
      created_date,
      contact_phonenumber,
      contact_name,
      contact_email,
    });
    res.status(201).json({ message: "A new reservation added!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failded to add user" });
  }
});

reservationsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const selectedReservation = await knex("reservation").where({ id });
    if (!selectedReservation) {
      return res.status(404).json({ error: "Reservation not exist" });
    }
    res.json(selectedReservation);
  } catch (err) {
    res.status(500).json({ error: " failed to find a meal" });
  }
});

reservationsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    number_of_guests,
    meal_id,
    created_date,
    contact_phonenumber,
    contact_name,
    contact_email,
  } = req.body;

  try {
    const updatedReservation = await knex("reservation").where({ id }).update({
      number_of_guests,
      meal_id,
      created_date,
      contact_phonenumber,
      contact_name,
      contact_email,
    });
    res.json(updatedReservation);
  } catch (err) {
    res.status(500).json({ error: " failed to update a reservation" });
  }
});

reservationsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReservation = await knex("reservation").where({ id }).del();
    res.json({ message: `Reservation with id ${id} deleted.` });
  } catch (err) {
    res.status(500).json({ error: " failed to delete a reservation" });
  }
});

export default reservationsRouter;
