import express from "express";

const reservationsRouter = express.Router();

reservationsRouter.get("/", (req, res) => {
  res.json({ message: "Hello reservations router" });
});


reservationsRouter.post("/", (req, res) => {
  res.json({ message: "Hello reservations router" });
});

reservationsRouter.get("/reservations/:id", (req, res) => {
  res.json({ message: "Hello reservations router" });
});
 

reservationsRouter.put("/reservations/:id", (req, res) => {
  res.json({ message: "Hello reservations router" });
});

reservationsRouter.delete("/reservations/:id", (req, res) => {
  res.json({ message: "Hello reservations router" });
});
  
export default reservationsRouter;
