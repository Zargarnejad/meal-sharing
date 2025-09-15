import "./Footer.css";
import Link from "next/link";
import { SocialMediaItem } from "./social-media";

export default function Footer() {
  return (
    <>
      <foot className="footer">
        <div className="footerItem">
          <p>Get in touch</p>
          <ul className="footerSocialmediaContainer">
            <li className="footerSocialmediaLink">
              <SocialMediaItem
                title="Facebook"
                url="https://www.facebook.com/"
                icon="/social-media/facebook.png"
              />
            </li>
            <li className="footerSocialmediaLink">
              <SocialMediaItem
                title="Instagram"
                url="https://instagram.com"
                icon="/social-media/instagram.png"
              />
            </li>
            <li className="footerSocialmediaLink">
              <SocialMediaItem
                title="Pinterest"
                url="https://pinterest.com"
                icon="/social-media/pinterest.png"
              />
            </li>
            <li className="footerSocialmediaLink">
              <SocialMediaItem
                title="Whatsapp"
                url="https://whatsapp.com"
                icon="/social-media/whatsapp.png"
              />
            </li>
          </ul>
        </div>
      </foot>
    </>
  );
}
