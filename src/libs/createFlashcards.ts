import { PrismaClient } from '@prisma/client';
import {prisma} from './db';
import { userProfile_T } from './userManager';
import axios from 'axios';

export type lessonData = {
  title: string;
  questions: { question: string; answer: string; }[];
}

interface lessonDataReq extends lessonData {
  userIdentity: userProfile_T;
}

export const createLesson = async (data: lessonDataReq) => {
  try {

    return await prisma.$transaction(async (tx) => {
      // Create an empty lesson
      const lesson = await tx.lesson.create({
        data: {
          title: data.title,
          user_id: {
            connect: {
              id: data.userIdentity.id,
            },
          },
        },
      });

      // Create questions
      for (const question of data.questions) {
        await tx.lessonQuestion.create({
          data: {
            question: question.question,
            answer: question.answer,
            attempt: false,
            lesson_id: {
              connect: {
                lesson_id: lesson.lesson_id,
              },
            },
          },
        });
      }
      const response = await axios.post('/api/publishLesson', lesson);
      console.log(response.data);
      return lesson;
    });

  } catch (error) {
    console.error(error);
    return;
  }
};

type addFlashcardData = {
  question: string;
  answer: string;
  lessonId: number;
}

export const addFlashcard = async (data: addFlashcardData) => {
  return await prisma.lessonQuestion.create({
    data: {
      question: data.question,
      answer: data.answer,
      attempt: false,
      lesson_id: {
        connect: {
          lesson_id: data.lessonId,
        },
      },
    },
  });
};

export const deleteFlashcard = async (flashcardId: number) => {
  return await prisma.lessonQuestion.delete({
    where: {
      question_id: flashcardId,
    },
  });
};