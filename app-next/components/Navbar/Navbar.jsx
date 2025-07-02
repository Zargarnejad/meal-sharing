import MealsList from "@/components/Meals/MealsList";
import "./Navbar.css";
import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbarItem">
          <img src="/logo.png" className="logo" />
        </div>
        <div className="navbarItem">
          <ul className="navbarMenu">
            <li className="navbarMenuItem">
              <Link href="/" className="navbarMenuLink">
                Home
              </Link>
            </li>
            <li className="navbarMenuItem">
              <Link href="/meals" className="navbarMenuLink">
                Meals
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
