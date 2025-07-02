"use client";

import { useState, useEffect } from "react";
import "./Meals.css";
import "../global.css";
import Meal from "./Meal";
import Link from "next/link";

function MealsList({ maxRows, title, displayShowMore }) {
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
    <div className="mainContainer">
      <div className="mealsListContainer">
        <h1>{title}</h1>
        <ul className="mealsList">
          {message}
          {meals
            .filter((meal, index) => {
              return index < maxRows;
            })
            .map((meal, index) => {
              return <Meal key={index} meal={meal} />;
            })}
        </ul>
        {displayShowMore && meals.length > 5 ? (
          <Link href="/meals">
            <button className="showMoreLink"> Show more...</button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MealsList;
