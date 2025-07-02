import { useState } from "react";
import "./MealPage.css";
export default function ReviewForm({ meal }) {
  const [reviewText, setReviewText] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [rating, setRating] = useState(5);
  const [submitState, setSubmitState] = useState("NOT_SUBMITTED");
  const [validationError, setValidationError] = useState("");

  const resetForm = () => {
    setReviewText("");
    setReviewDescription("");
    setRating(5);
  };

  const submitForm = async (e) => {
    if (reviewText.trim().length === 0) {
      setSubmitState("VALIDATION_FAILED");
      setValidationError("Review title can not be empty");
      return;
    }

    const reviewData = {
      meal_id: meal.id,
      title: reviewText,
      description: reviewDescription,
      stars: rating,
    };

    try {
      const res = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        setSubmitState("SUBMIT_SUCCEEDED");
        resetForm();
      } else {
        setSubmitState("SUBMIT_FAILED");
      }
    } catch (e) {
      setSubmitState("SUBMIT_FAILED");
    }
  };

  // Prepare a message to show in the page in case of error or loading
  let message = <></>;
  switch (submitState) {
    case "SUBMIT_FAILED":
      message = (
        <div className="errorMessage">
          Submitting the review failed. Please try again later ;(
        </div>
      );
      break;
    case "SUBMIT_SUCCEEDED":
      message = (
        <div className="successMessage">Your review submitted successfully</div>
      );
      break;
    case "VALIDATION_FAILED":
      message = <div className="errorMessage">{validationError}</div>;
      break;
  }

  return (
    <>
      <form className="formContainer">
        <h3> We are waiting for your feedback</h3>
        {message}
        <div>
          Title:
          <input
            type="text"
            name="title"
            id="title"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        <div>
          Description:
          <textarea
            name="description"
            id="description"
            rows="5"
            value={reviewDescription}
            onChange={(e) => setReviewDescription(e.target.value)}
          />
        </div>
        <div>
          Rate:
          <select
            name="rate"
            id="rate"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <button
            className="submitBtn"
            type="button"
            onClick={(e) => {
              submitForm(e);
            }}
          >
            Add Review
          </button>
          <button
            className="submitBtn"
            type="button"
            onClick={(e) => {
              resetForm();
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
}
