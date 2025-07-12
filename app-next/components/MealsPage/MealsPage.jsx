import MealsList from "@/components/Meals/MealsList";
import "./MealsPage.css";
export default function MealsPage() {
  return (
    <>
      <MealsList
        maxRows={1000}
        title="Fresh meals, made with love — pick your favorite."

        displayShowMore={false}
      />
    </>
  );
}
