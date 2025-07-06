"use client";

import { useState, useEffect } from "react";
import "./Meals.css";
import "../global.css";
import Meal from "./Meal";
import Link from "next/link";

function MealsList({ maxRows, title, displayShowMore }) {
  const [meals, setMeals] = useState([]);
  const [dataLoadState, setDataLoadState] = useState("LOADING");
  const [searchState, setSearchState] = useState("NO_SEARCH");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("when");
  const [sortDirection, setSortDirection] = useState("asc");

  const fetchMeals = async () => {
    if (search.trim().length != 0) {
      serchedMeals();
    } else {
      const mealsResponse = await fetch(
        `http://localhost:3001/api/meals/?sortKey=${sort}&sortDir=${sortDirection}`
      )
        .then((response) => response.json())
        .catch((e) => {
          setDataLoadState("LOADING_FAILED");
        });

      if (mealsResponse !== undefined) {
        setDataLoadState("LOADING_SUCCEEDED");
        setMeals(mealsResponse.results);
      }
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [sort, sortDirection]);

  const serchedMeals = async () => {
    if (search.trim().length == 0) {
      setSearchState("NO_SEACRH_TERM");
      setMeals([]);
    } else {
      const mealsResponse = await fetch(
        `http://localhost:3001/api/meals/?title=${search}&sortKey=${sort}&sortDir=${sortDirection}`
      )
        .then((response) => response.json())
        .catch((e) => {
          setSearchState("SEARCHING_FAILED");
        });

      if (mealsResponse !== undefined) {
        if (mealsResponse.results.length == 0) {
          setSearchState("NO_SEACRH_RESULT");
        } else {
          setSearchState("SEARCHING_SUCCEEDED");
        }
        setMeals(mealsResponse.results);
      }
    }
  };

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

  // Prepare a message to show in the page for searching
  let searchMessage = <></>;
  switch (searchState) {
    case "NO_SEARCH":
      searchMessage = "";
      break;
    case "SEARCHING_SUCCEEDED":
      message = `Results for:${search}`;
      break;
    case "NO_SEACRH_TERM":
      searchMessage = "Please enter a value to search for!";
      break;
    case "NO_SEACRH_RESULT":
      searchMessage = `NO result found for ${search}`;
      break;
    case "SEARCHING_FAILED":
      searchMessage = `Error searching for ${search}`;
      break;
  }

  return (
    <div>
      <div className="titleStyle">
        <h1>{title}</h1>
      </div>
      <div className="searchMainContainer">
        <div className="searchContainer">
          <input
            className="inputBox"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type here to find meals ..."
          />
          <button className="searchBtn" onClick={serchedMeals}>
            {" "}
            Search
          </button>
        </div>
        <div className="searchMessage">{searchMessage}</div>
      </div>
      <div className="sortMainContainer">
        <div className="sortContainer">
          <label>Sort meals by:</label>
          <select
            className="sortSelectArea"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="when">Date</option>
            <option value="max_reservations">Reservation capacity</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="sortContainer"></div>
        <label>Sort direction:</label>
        <select
          className="sortSelectArea"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="mainContainer">
        <div className="mealsListContainer">
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
    </div>
  );
}

export default MealsList;
