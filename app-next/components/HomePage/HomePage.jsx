import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import styles from "./HomePage.css";
import MealsList from "../Meals/MealsList";

// Feel free to replace the content of this component with your own
function HomePage() {
  return (
    <>
      <div className="welcomeSection">
        <h1 className="welcomeTitle"> "Share a Meal, Share a Moment"</h1>
      </div>
      <MealsList maxRows={6} />
      
    </>
  );
}

export default HomePage;
