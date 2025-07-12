"use client";

import { useState, useEffect } from "react";
import "./Meals.css";
import { useRouter } from "next/navigation";

function Meal({ meal }) {
  const router = useRouter();

  return (
    <li
      className="mealsListItem"
      onClick={(e) => router.push(`/meals/${meal.id}`)}
    >
      <img
        className="mealsItemImg"
        src={`/mealPhoto/${meal.id}.jpg`}
        alt={meal.title}
        loading="lazy"
      />
      <div className="mealsItemTitle">
        <h3>{meal.title}</h3>
        <span>{meal.price}€</span>
      </div>
      <p className="mealsListItemLocation">{meal.location}</p>
      <p className="mealsDescription">{meal.description}</p>
    </li>
  );
}
export default Meal;
