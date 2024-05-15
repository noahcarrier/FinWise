import { PrismaClient } from '@prisma/client';
import {prisma, redis, redisPrefix} from './db';
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
    // Clear lesson cache if exists
    await redis.del(`${redisPrefix}LESSONS:${data.userIdentity.id}`);

    return await prisma.$transaction(async (tx) => {
      // Create an empty lesson
      const lesson = await tx.lesson.create({
        data: {
          title: data.title,
          user_id: data.userIdentity.id
        },
      });

      // Create questions
      for (const question of data.questions) {
        await tx.lessonquestion.create({
          data: {
            question: question.question,
            answer: question.answer,
            attempt: false,
            lesson_id: lesson.id,
          },
        });
      }
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
  return await prisma.lessonquestion.create({
    data: {
      question: data.question,
      answer: data.answer,
      attempt: false,
      lesson_id: data.lessonId,
    },
  });
};

export const deleteFlashcard = async (flashcardId: number) => {
  return await prisma.lessonquestion.delete({
    where: {
      id: flashcardId,
    },
  });
};

type lessonInfo = {
  id: number;
  title: string;
  created_at: Date;
}

export async function getLessonsById(userId: number): Promise<lessonInfo[] | undefined> {
  try {
    const cacheInfo = JSON.parse(await redis.get(`${redisPrefix}LESSONS:${userId}`) ?? "[]") as lessonInfo[];
    if(cacheInfo.length > 0)
      return cacheInfo;
    
    // No info found in cache, pull from DB
    const lessons = await prisma.lesson.findMany({
      where: {
        user_id: userId,
      }
    });
    const formatData = lessons.map(lesson=> {
      return {
        id: lesson.id,
        title: lesson.title,
        created_at: lesson.created_at,
      }
    });
    await redis.set(`${redisPrefix}LESSONS:${userId}`, JSON.stringify(formatData), {
      EX: 3600
    });
    return formatData;
  }

  catch (error) {
    console.error("Error fetching lessons:", error);
    return;
  }
}

export const getSpecificLessonById = async (lessonId: number) => {
  try {
    const lesson = await prisma?.lesson.findUnique({
      where: {
        id: lessonId,
      },
      include: {
        lessonquestion: true, 
      },
    });
    return lesson;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/*
export const getLessonById = async (lessonId: number) => {
  try {
    // Use Prisma to fetch the lesson based on its ID
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      include: {
        lessonquestion: true, // Include associated questions with the lesson
      },
    });
    return lesson;
  } catch (error) {
    console.error(error);
    return null; // Return null if there's an error
  }
};*/

export const updateAttemptStatus = async (questionId: number, newAttemptStatus: boolean) => {
  try {
    const updatedQuestion = await prisma.lessonquestion.update({
      where: {
        id: questionId,
      },
      data: {
        attempt: newAttemptStatus,
      },
    });
    return updatedQuestion;
  } catch (error) {
    console.error(error);
    return;
  }
};