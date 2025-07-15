-- PostgreSQL DDL
CREATE TABLE meal (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  "when" TIMESTAMP,
  max_reservations INTEGER,
  price NUMERIC(7,2),
  created_date DATE
);

CREATE TABLE reservation (
  id SERIAL PRIMARY KEY,
  number_of_guests INTEGER,
  meal_id INTEGER,
  created_date DATE,
  contact_phonenumber VARCHAR(255),
  contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  CONSTRAINT meal_rfk FOREIGN KEY (meal_id) REFERENCES meal(id)
);

CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  meal_id INTEGER,
  stars INTEGER,
  created_date DATE,
  CONSTRAINT meal_fk FOREIGN KEY (meal_id) REFERENCES meal(id)
);
