import MealsList from "@/components/Meals/MealsList";
import "./MealsPage.css";
export default function MealsPage() {
  return (
    <>
      <MealsList
        maxRows={1000}
        title="All avaiable meals for sharing"
        displayShowMore={false}
      />
    </>
  );
}
