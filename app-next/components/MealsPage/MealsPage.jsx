import MealsList from "@/components/Meals/MealsList";
import "./MealsPage.css";
import Link from "next/link";
import Navbar from "../Navbar/navbar";

export default function MealsPage() {
  return (
    <>
      <MealsList maxRows={1000} />
    </>
  );
}
