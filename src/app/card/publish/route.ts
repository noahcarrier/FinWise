import {createLesson, lessonData} from '@/libs/createFlashcards';
import { getUserFromCache } from '@/libs/userManager';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  // Pull user session
  const user = await getUserFromCache(cookies().get("session")?.value);
  if(!user)
    return new Response('Auth Required', {status: 402});

  const reqData: lessonData = await request.json();
  
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