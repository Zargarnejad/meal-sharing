import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div>
      <div className={styles.aboutUsMainContainer}>
        <div className={styles.aboutUsContainer}>
          <div className={styles.aboutUsLeftSide}></div>
          <div className={styles.aboutUsRightSide}>
            <h2>About Us</h2>
            <div>
              <p>
                Welcome to MealSharing – where good food brings people together.
              </p>
              <p>
                We believe meals are more than just food — they’re stories,
                memories, and connections. That’s why we created this platform:
                to connect passionate home cooks and food lovers around the
                world.
              </p>
            </div>
            <div>
              <h4>🍽 Our Mission</h4>
              <p>To make dining more personal by allowing people to:</p>
              <ul>
                <li>Share home-cooked meals</li>
                <li>Discover new cultures through food</li>
                <li>Meet amazing people around the table</li>
              </ul>
            </div>
            <div>
              <h4>🌍 What We Offer</h4>
              <ul>
                <li>
                  <b>Host a meal</b>: Cook your favorite dish and open your
                  table to guests.
                </li>
                <li>
                  <b>Join a meal</b>: Explore home-hosted meals in your city or
                  while traveling.
                </li>
                <li>
                  <b>Share your experience</b>: Leave reviews and connect with
                  the community.
                </li>
              </ul>
            </div>
            <div>
              <h4>🤝 Why We Do It</h4>
              <p>In a world moving fast, we slow down — one meal at a time.</p>
              <p>
                We believe in real conversations, local experiences, and that
                every shared bite is a chance to build something meaningful.
              </p>
            </div>
            <div>
              Whether you're a passionate cook or a curious guest — there's a
              seat at the table for you. Let's eat, connect, and share something
              unforgettable.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
