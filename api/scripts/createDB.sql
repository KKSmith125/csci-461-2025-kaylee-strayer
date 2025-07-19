DROP DATABASE IF EXISTS session_db;
CREATE DATABASE session_db;

\c session_db

DROP TABLE IF EXISTS client_reasons CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS trainers CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS reasons CASCADE;

CREATE TABLE trainers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR (2000) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  weight INTEGER,
  height_ft INTEGER,
  height_in INTEGER
);

CREATE TABLE reasons (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  session_date DATE,
  session_time TIME,
  trainer_id INTEGER NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
  client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE client_reasons (
  id SERIAL PRIMARY KEY,
  session_id INTEGER NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  reason_id INTEGER NOT NULL REFERENCES reasons(id) ON DELETE CASCADE
);

DO $$
  DECLARE
  --Trainers
  kaylee_trainer_id INT;
  cameron_trainer_id INT;

  --Clients
  michael_client_id INT;

  --Reasons
  mental_toughness_id INT;
  weight_id INT;
  health_id INT;
  muscle_id INT;
  casual_id INT;
  sport_id INT;

  --Sessions
  first_session_id INT;

  BEGIN
    INSERT INTO trainers(name, description, is_admin, email, password) VALUES ('Kaylee Strayer', 'A dedicated trainer who has spent years refining expertise in areas such as weight management, muscle building, nutrition and soccer. Takes a tailored approach with each client, involving them in the decision-making process from the very beginning.', TRUE, 'kayleestrayer@outlook.com', 'bigGainz26') RETURNING id INTO kaylee_trainer_id;
    INSERT INTO trainers(name, description) VALUES ('Cameron Malone', 'A trainer drawn to athletics from a young age and continues to stay fit through firefighting and weightlifting. He specializes in giving the client a plan that will help them reach their performance goals.', TRUE, 'cameronmalone@outlook.com', 'fireLifts15') RETURNING id INTO cameron_trainer_id;

    INSERT INTO clients(name, weight, height_ft, height_in) VALUES ('Michael DeSanty', 200, 5, 11) RETURNING id INTO michael_client_id;
    
    INSERT INTO reasons(name) VALUES('Mental Toughness') RETURNING id INTO mental_toughness_id;
    INSERT INTO reasons(name) VALUES('Weight Loss') RETURNING id INTO weight_id;
    INSERT INTO reasons(name) VALUES('Health Benefits') RETURNING id INTO health_id;
    INSERT INTO reasons(name) VALUES('Muscle Growth') RETURNING id INTO muscle_id;
    INSERT INTO reasons(name) VALUES('Casual Fitness') RETURNING id INTO casual_id;
    INSERT INTO reasons(name) VALUES('Sports') RETURNING id INTO sport_id;

    INSERT INTO sessions (session_date, session_time, trainer_id, client_id) VALUES ('2025-12-20', '16:00', kaylee_trainer_id, michael_client_id) RETURNING id INTO first_session_id;
    INSERT INTO client_reasons (session_id, reason_id) VALUES (first_session_id, casual_id);
  END
$$