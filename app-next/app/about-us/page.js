import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div>
      <div className={styles.aboutUsMainContainer}>
        <div className={styles.aboutUsContainer}>
          <div className={styles.aboutUsLeftSide}></div>
          <div className={styles.aboutUsRightSide}>
            <h2>About Us</h2>
            <p>
              Welcome to MealSharing – where good food brings people together.
              <br />
              We believe meals are more than just food — they’re stories,
              memories, and connections. That’s why we created this platform: to
              connect passionate home cooks and food lovers around the world.
              <br />
            </p>
            <p>
              <h3>🍽 Our Mission</h3> To make dining more personal by allowing
              people to:
              <ul>
                <li>Share home-cooked meals</li>
                <li>Discover new cultures through food</li>
                <li>Meet amazing people around the table</li>
              </ul>
            </p>
            <p>
              <h3>🌍 What We Offer</h3>
              <ul>
                <li>
                  Host a meal: Cook your favorite dish and open your table to
                  guests.
                </li>
                <li>
                  Join a meal: Explore home-hosted meals in your city or while
                  traveling.
                </li>
                <li>
                  Share your experience: Leave reviews and connect with the
                  community.
                </li>
              </ul>
            </p>
            <p>
              <h3>🤝 Why We Do It</h3>
              In a world moving fast, we slow down — one meal at a time.
              <br />
              We believe in real conversations, local experiences, and that
              every shared bite is a chance to build something meaningful.
            </p>
            <p>
              Whether you're a passionate cook or a curious guest — there's a
              seat at the table for you. Let's eat, connect, and share something
              unforgettable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
