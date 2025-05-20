import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();
 
mealsRouter.get("/", async (req, res) => {

  const allMeals = await knex("meal");
  res.json({ allMeals });
});


mealsRouter.post("/", async (req, res) => {
    const {
        id,
      title,
      description,
      location,
      when,
      max_reservations,
      price,
      created_date,
    } = req.body;
    if(!title){ 
        return res.status(400).json({error:'Title is required'})
    }
    try{
        await knex("meal")
        .insert({id,title,description,location,when,max_reservations, price,created_date });
        res.status(201).json({message:'A new meal added!'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Failded to add user'})
    }
});



mealsRouter.get("/:id",async (req, res) => {
const {id} = req.params;
try{ 
   const selectedMeal = await knex('meal').where({id});
    if(!selectedMeal){
        return res.status(404).json({error:"Meal not found"});
    }
    res.json(selectedMeal)

}catch(err){
    res.status(500).json({error:' failed to find a meal'})
}

});


mealsRouter.put("/:id", async (req, res) => {
    const {id} = req.params
    const {
        title,
        description,
        location,
        when,
        max_reservations,
        price,
        created_date,
      } = req.body;
  
    try {
      const updatedMeal = await knex("meal")
        .where({ id })
        .update({
          title,
          description,
          location,
          when,
          max_reservations,
          price,
          created_date
        });
      res.json(updatedMeal);

    } catch (err) {
      res.status(500).json({ error: " failed to update a meal" });
    }

});


mealsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
try {
  const deletedMeal = await knex("meal").where({ id }).del();
  res.json({message:`Meal with id ${id} deleted.`})
} catch (err) {
  res.status(500).json({ error: " failed to delet a meal" });
}


});
   

export default mealsRouter;
