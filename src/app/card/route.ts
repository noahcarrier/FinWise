import {createLesson, lessonData} from '@/libs/createFlashcards';
import { getUserFromCache } from '@/libs/userManager';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  // Pull user session
  const user = await getUserFromCache(cookies().get("session")?.value);
  if(!user)
    return new Response('Auth Required', {status: 402});

  const reqData: lessonData = await request.json();

  // Validate general input
  if(reqData.title.trim() === '' || reqData.questions.length === 0)
    return new Response('Missing title/cards', {status: 400});
  
  // Validate individual questions/answers
  for(const question of reqData.questions)
    if(question.question.trim() === '' || question.answer.trim() === '')
      return new Response('Invalid input from the cards', {status: 400});
  
  const res = await createLesson({
    title: reqData.title,
    questions: reqData.questions,
    userIdentity: user,
  })

  if(!res)
    return new Response('Failed to create lesson', {status: 500});

  return new Response(JSON.stringify({
    message: "Lesson successfully created",
    lesson: res,
  }), {status: 201});
}


export async function GET(request: Request) {
  // Pull user session
  const user = await getUserFromCache(cookies().get("session")?.value);
  if(!user)
    return new Response('Auth Required', {status: 402});

  try {
    const lessons = await getLessonsById(user.id);

    return new Response(JSON.stringify(lessons), {status: 200});
    
  }
  catch (error) {
    console.error("Error fetching lessons:", error);
    return new Response('Internal Server Error', {status: 500})
  }

  
}

export async function getLessonsById(userId: number) {
  try {
    const lessons = await prisma?.lesson.findMany({
      where: {
        user_id: userId,
      }
    });
    return lessons;
  }
  catch (error) {
    console.error("Error fetching lessons:", error);
    return null;
  }
}

export async function GET_SINGLE(request: Request, lessonId: number) {
  // Pull user session
  const user = await getUserFromCache(cookies().get("session")?.value);
  if (!user)
    return new Response('Auth Required', { status: 402 });

  try {
    const lesson = await getSpecificLessonById(lessonId);

    if (!lesson) {
      return new Response('Lesson not found', { status: 404 });
    }

    // Ensure the requested lesson belongs to the user
    if (lesson.user_id !== user.id) {
      return new Response('Unauthorized', { status: 403 });
    }

    return new Response(JSON.stringify(lesson), { status: 200 });

  } catch (error) {
    console.error("Error fetching lesson:", error);
    return new Response('Internal Server Error', { status: 500 })
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
