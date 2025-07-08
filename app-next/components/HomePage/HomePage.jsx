import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import styles from "./HomePage.css";
import MealsList from "../Meals/MealsList";

// Feel free to replace the content of this component with your own
function HomePage() {
  return (
    <>
      <div className="heroContainer">
        <div className="heroOverlay">
          <div className="heroContent">
            <h1 className="welcomeTitle ">Taste the World at a Local Table </h1>
            <p>
              Join a global community of food lovers sharing unique dining
              experiences right where they live.
            </p>
            <h3>Find a Meal Experience</h3>
          </div>
        </div>
      </div>
      <div className="missionMainContainer">
        <div className="missionContainer">
          <div className="missionLeftSide"></div>
          <div className="missionRightSide">
            <h2>Our Mission</h2>
            <p>
              At MealShare, we bring people together through food. Our mission
              is to connect cultures, support local cooks, and make every meal
              an unforgettable experience.
            </p>
          </div>
        </div>
      </div>

      <MealsList
        maxRows={6}
        title=" “What’s cooking near you today?”"
        displayShowMore={true}
      />

      <div className="missionMainContainer">
        <div className="missionContainer">
          <div className="missionLeftSide"></div>
          <div className="missionRightSide">
            <h2>Our Mission</h2>
            <p>
              At MealShare, we bring people together through food. Our mission
              is to connect cultures, support local cooks, and make every meal
              an unforgettable experience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
