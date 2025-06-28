"use client";

import { useState, useEffect } from "react";
import "./HomePage.css";

function Meal({ meal }) {
  return (
    <li className="mealsListItem">
      <div className="mealsListItemLocation">{meal.location}</div>
      <h3 className="mealsItemTitle">
        <div>{meal.title}</div>
        <div>{meal.price}</div>
      </h3>
      <p>{meal.description}</p>
    </li>
  );
}

export default Meal;
