-- SQLBook: Code
/* User Table */

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/* Lesson Table */
CREATE TABLE lesson (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/* LessonQuestion Table */
CREATE TABLE lessonQuestion (
  id SERIAL PRIMARY KEY,
  lesson_id INT NOT NULL REFERENCES lesson(id),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  attempt BOOLEAN NOT NULL DEFAULT FALSE
);
