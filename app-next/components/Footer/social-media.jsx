import React from "react";

export function SocialMediaItem({ title, url, icon }) {
  return (
    <a
      href={url}
      className="footerSocialmediaAnchor"
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={icon} alt={title} className="socialmediaIcon" />
    </a>
  );
}
