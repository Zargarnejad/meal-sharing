"use client";

import { useState, useEffect } from "react";
import "./HomePage.css";

function MealsList() {
  const [meals, setMeals] = useState([]);
  const [dataLoadState, setDataLoadState] = useState("LOADING");

  useEffect(() => {
    const fetchMeals = async () => {
      const mealsResponse = await fetch("http://localhost:3001/api/meals/")
        .then((response) => response.json())
        .catch((e) => {
          setDataLoadState("LOADING_FAILED");
        });

      if (mealsResponse !== undefined) {
        setDataLoadState("LOADING_SUCCEEDED");
        setMeals(mealsResponse.results);
      }
    };

    fetchMeals();
  }, []);

  // Prepare a message to show in the page in case of error or loading
  let message = <></>;
  switch (dataLoadState) {
    case "LOADING_FAILED":
      message = (
        <span className="errorMessage">Loading meals list failed ;(</span>
      );
      break;
    case "LOADING":
      message = "Loading list of meals...";
      break;
  }

  return (
    <div className="mealsListContainer">
      <h1>Meals List:</h1>
      <ul className="mealsList">
        {message}
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
