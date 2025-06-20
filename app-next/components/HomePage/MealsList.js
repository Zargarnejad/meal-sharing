"use client";

import { useState, useEffect } from "react";
import "./HomePage.css";

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
          return (
            <li key={index} className="mealsListItem">
              <h3 className="mealsItemTitle">
                <div>{meal.title}</div>
                <div>{meal.price}</div>
              </h3>
              <p>{meal.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MealsList;
