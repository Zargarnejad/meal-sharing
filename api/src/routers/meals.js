import express from "express";

const mealsRouter = express.Router();
 
mealsRouter.get("/", (req, res) => {
  res.json({ message: "Hello meals router" });
});


mealsRouter.post("/", (req, res) => {
  res.json({ message: "Hello meals router" });
});



mealsRouter.get("/meals/:id", (req, res) => {
  res.json({ message: "Hello meals router" });
});


mealsRouter.put("/meals/:id", (req, res) => {
  res.json({ message: "Hello meals router" });
});


mealsRouter.delete("/meals/:id", (req, res) => {
  res.json({ message: "Hello meals router" });
});
   

export default mealsRouter;
