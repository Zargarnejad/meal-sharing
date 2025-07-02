import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import styles from "./HomePage.css";
import MealsList from "../Meals/MealsList";

// Feel free to replace the content of this component with your own
function HomePage() {
  return (
    <>
      <MealsList
        maxRows={6}
        title="Selected meals are here"
        displayShowMore={true}
      />
    </>
  );
}

export default HomePage;
