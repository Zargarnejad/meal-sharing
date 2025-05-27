import express from "express";
import knex from "../database_client.js";
import { validateId } from "./middlewares.js";

export const reservationsRouter = express.Router();

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
  

reservationsRouter.get("/", async (req, res) => {
  const allReservations = await knex("reservation");
  res.json({ allReservations });
});

reservationsRouter.post("/", async (req, res) => {
  const {
    number_of_guests,
    meal_id,
    contact_phonenumber,
    contact_name,
    contact_email,
  } = req.body;

  if (!contact_name || typeof contact_name !== "string") {
    return res
      .status(400)
      .json({ error: "Contact's name is required and must be a string." });
  }
 if (!contact_phonenumber || typeof contact_phonenumber !== "number" || String(contact_phonenumber).length != 8) {
    return res
      .status(400)
      .json({ error: "Contact's phone number is required and must be a 8 digit number." });
 }

 if(!isValidEmail(contact_email)){
    return res
      .status(400)
      .json({
        error:
          "Contact's Email address is invalid .",
      });
 }

  try {
    await knex("reservation").insert({
      number_of_guests,
      meal_id,
      created_date : new Date(),
      contact_phonenumber,
      contact_name,
      contact_email,
    });
    res.status(201).json({ message: "A new reservation added!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add a new reservation" });
  }
});

reservationsRouter.get("/:id",validateId, async (req, res) => {
  const { id } = req.params;
  try {
    const selectedReservation = await knex("reservation").where({ id });
    if (!selectedReservation) {
      return res.status(404).json({ error: "Reservation not exist" });
    }
    res.json(selectedReservation);
  } catch (err) {
    res.status(500).json({ error: " Failed to find a reservation" });
  }
});

reservationsRouter.put("/:id",validateId, async (req, res) => {
  const { id } = req.params;
  const {
    number_of_guests,
    meal_id,
    contact_phonenumber,
    contact_name,
    contact_email,
  } = req.body;

  
  if (!contact_name || typeof contact_name !== "string") {
    return res
      .status(400)
      .json({ error: "Contact's name is required and must be a string." });
  }
  if (
    !contact_phonenumber ||
    typeof contact_phonenumber !== "number" ||
    String(contact_phonenumber).length != 8
  ) {
    return res
      .status(400)
      .json({
        error:
          "Contact's phone number is required and must be a 8 digit number.",
      });
  }

  if (!isValidEmail(contact_email)) {
    return res.status(400).json({
      error: "Contact's Email address is invalid .",
    });
  }

  try {
    const updatedReservation = await knex("reservation").where({ id }).update({
      number_of_guests,
      meal_id,
      contact_phonenumber,
      contact_name,
      contact_email,
    });
    res.json({ message: `Reservation with id ${id} updated.` });
  } catch (err) {
    res.status(500).json({ error: " Failed to update a reservation" });
  }
});

reservationsRouter.delete("/:id",validateId, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReservation = await knex("reservation").where({ id }).del();
    res.json({ message: `Reservation with id ${id} deleted.` });
  } catch (err) {
    res.status(500).json({ error: " Failed to delete a reservation" });
  }
});

