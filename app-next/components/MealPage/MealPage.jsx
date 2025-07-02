"use client";
import { usePathname } from "next/navigation";
import "./MealPage.css";
import "../global.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReserveForm from "./ReserveForm";
import ReviewForm from "./ReviewForm";

export default function MealPage() {
  const [meal, setMeal] = useState([]);
  const [dataLoadState, setDataLoadState] = useState("LOADING");
  const [reserveFormVisible, setReserveFormVisible] = useState(false);

  const pathname = usePathname();
  const mealId = pathname.split("/")[2];

  useEffect(() => {
    const fetchMealDetails = async () => {
      const mealResponse = await fetch(
        `http://localhost:3001/api/meals/${mealId}`
      )
        .then((response) => response.json())
        .catch((e) => {
          setDataLoadState("LOADING_FAILED");
        });

      if (mealResponse !== undefined) {
        setDataLoadState("LOADING_SUCCEEDED");
        setMeal(mealResponse);
      }
    };

    fetchMealDetails();
  }, []);

  // Prepare a message to show in the page in case of error or loading
  let message = <></>;
  switch (dataLoadState) {
    case "LOADING_FAILED":
      message = (
        <div className="errorMessage">
          Loading meal details for meal ID {mealId} failed ;(
        </div>
      );
      break;
    case "LOADING":
      message = <div>{`Loading details of meal ID ${mealId} ...`}</div>;
      break;
  }

  const showReserveForm = (e) => {
    setReserveFormVisible(true);
  };

  return (
    <div className="mainContainer">
      <div className="mealDetailsContainer">
        {message}
        {meal.map((m, index) => {
          return (
            <div key={index}>
              <h1>{m.title}</h1>
              <div className="mealDetailRow">
                <h2>{m.location}</h2>
                <p>{new Date(m.when).toLocaleString()}</p>
              </div>
              <h4>Price: {m.price}</h4>
              <h4>Max Reservation: {m.max_reservations}</h4>
              <div>{m.description}</div>
              {m.current_reservation_count === "null" ||
              m.current_reservation_count < m.max_reservations ? (
                <ReserveForm meal={m} />
              ) : (
                ""
              )}
              <ReviewForm meal={m} />
            </div>
          );
        })}
        
      </div>
    </div>
  );
}
