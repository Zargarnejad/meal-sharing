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
