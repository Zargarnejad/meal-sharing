"use client";
import { usePathname } from "next/navigation";
import "./MealPage.css";
import "../global.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReserveForm from "./ReserveForm";
import ReviewForm from "./ReviewForm";
import Reviews from "../Review/Reviews";

export default function MealPage() {
  const [meal, setMeal] = useState([]);
  const [dataLoadState, setDataLoadState] = useState("LOADING");
  const [reserveFormVisible, setReserveFormVisible] = useState(false);
  const [reviewFormVisible, setReviewFormVisible] = useState(false);

  const pathname = usePathname();
  const mealId = pathname.split("/")[2];

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

  useEffect(() => {
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

  const handleSuccessReserve = (e) => {
    fetchMealDetails();
  };
  return (
    <div className="mainContainer">
      <div className="mealContainer">
        {message}
        {meal.map((m, index) => {
          return (
            <div key={index} className="detailsContainer">
              <fieldset>
                <legend>
                  <h1>{m.title}</h1>
                </legend>
                <img
                  className="mealPageImg"
                  src={`/mealPhoto/${m.id}.jpg`}
                  alt={m.title}
                  loading="lazy"
                />

                <div className="mealDetailRow">
                  <h2>{m.location}</h2>
                  <p>{new Date(m.when).toLocaleString()}</p>
                </div>
                <h4>Price: {m.price}</h4>
                <h4>Max Reservation: {m.max_reservations}</h4>
                <h4>
                  Available Reservation:{" "}
                  {m.max_reservations - m.current_reservation_count}
                </h4>
                <div className="mealDescription">{m.description}</div>
                <div className="formButtonsContainer">
                  <button
                    className="submitBtn"
                    type="button"
                    onClick={(e) => {
                      setReserveFormVisible(true);
                      setReviewFormVisible(false);
                    }}
                    disabled={
                      m.current_reservation_count !== "null" &&
                      m.current_reservation_count >= m.max_reservations
                    }
                  >
                    Book seat
                  </button>
                  <button
                    className="submitBtn"
                    type="button"
                    onClick={(e) => {
                      setReviewFormVisible(true);
                      setReserveFormVisible(false);
                    }}
                  >
                    Add Review
                  </button>
                </div>
                <Reviews mealId={m.id} />
              </fieldset>

              <div className={reserveFormVisible ? "" : "hidden"}>
                <ReserveForm
                  meal={m}
                  onSuccess={handleSuccessReserve}
                  onClose={() => setReserveFormVisible(false)}
                />
              </div>
              <div className={reviewFormVisible ? "" : "hidden"}>
                <ReviewForm
                  meal={m}
                  onClose={() => setReviewFormVisible(false)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
