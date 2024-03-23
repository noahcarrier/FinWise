/* User Table */

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/* Lesson Table */
CREATE TABLE lesson (
  lesson_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/* LessonQuestion Table */
CREATE TABLE lessonQuestion (
  question_id SERIAL PRIMARY KEY,
  lesson_id INT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  FOREIGN KEY (lesson_id) REFERENCES lesson(lesson_id)
);
