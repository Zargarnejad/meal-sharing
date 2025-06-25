"use client";

import { useState, useEffect } from "react";
import "./HomePage.css";
import Meal from "./Meal";

function MealsList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const mealsResponse = await fetch(
        "http://localhost:3001/api/meals/"
      ).then((response) => response.json());

      setMeals(mealsResponse.results);
    };

    fetchMeals();
  }, []);

  return (
    <div className="mealsListContainer">
      <h1>Meals List:</h1>
      <ul className="mealsList">
        {meals.map((meal, index) => {
          return <Meal key={index} meal={meal} />
        })}
      </ul>
    </div>
  );
}

export default MealsList;
