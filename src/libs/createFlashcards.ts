import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createLesson = async (req: Request, res: Response) => {
  try {
    const { title, questions, user_id } = req.body;

    const lesson = await prisma.lesson.create({
      data: {
        title,
        user_id,
        questions: {
          create: questions.map((question: { question: string; answer: string; }) => ({
            question: question.question,
            answer: question.answer
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    res.status(201).json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create lesson' });
  }
};