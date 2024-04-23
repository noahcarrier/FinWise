import { PrismaClient } from '@prisma/client';
import {prisma} from './db';
import { userProfile_T } from './userManager';

type lessonData = {
  title: string;
  userIdentity: userProfile_T;
  questions: { question: string; answer: string; }[];
}

export const createLesson = async (data: lessonData) => {
  try {
    const lessonTX = await prisma.$transaction(async (tx) => {
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
      for(const question of data.questions) {
        await tx.lessonQuestion.create({
          data: {
            question: question.question,
            answer: question.answer,
            lesson_id: {
              connect: {
                lesson_id: lesson.lesson_id,
              },
            },
          },
        });
      }
      return lesson;
    });

    return lessonTX;
  } catch (error) {
    console.error(error);
    return;
  }
};