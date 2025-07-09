import { useEffect, useState } from "react";
import "./Reviews.css";
export default function Reviews({ mealId }) {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const reviewsResponse = await fetch(
      `http://localhost:3001/api/meals/${mealId}/reviews`
    )
      .then((response) => response.json())
      .catch((e) => {
        setDataLoadState("LOADING_FAILED");
      });

    if (reviewsResponse !== undefined) {
      setReviews(reviewsResponse);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="reviewsContainer">
      {reviews.map((review, index) => {
        return (
          <div key={index} className="review">
            <div className="reviewStar">
              {"★".repeat(review.stars)}
              {"☆".repeat(5 - review.stars)}
            </div>{" "}
            <span className="reviewTitle">{review.title}</span>
            <p>{review.created_date}</p>
            <p>{review.description}</p>
          </div>
        );
      })}
    </div>
  );
}
