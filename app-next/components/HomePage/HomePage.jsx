import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import styles from "./HomePage.css";
import MealsList from "../Meals/MealsList";

// Feel free to replace the content of this component with your own
function HomePage() {
  return (
    <>
      <div className="heroContainer">
        <div>
          <h1 className="welcomeTitle ">
            "Because meals are better when shared."
          </h1>
        </div>
      </div>
      <MealsList
        maxRows={6}
        title=" “What’s cooking near you today?”"
        displayShowMore={true}
      />
    </>
  );
}

export default HomePage;
