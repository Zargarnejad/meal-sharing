import MealsList from "@/components/Meals/MealsList";
import "./Footer.css";
import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <foot className="footer">
        <div className="footerItem">
          <p>Information</p>
        </div>
        <div className="footerItem">
          <ul className="footerMenu">
            <li className="footerMenuItem">
              <Link href="/" className="footerMenuLink">
                media
              </Link>
            </li>
            <li className="footerMenuItem">
              <Link href="/meals" className="footerMenuLink">
                media
              </Link>
            </li>
          </ul>
        </div>
      </foot>
    </>
  );
}
