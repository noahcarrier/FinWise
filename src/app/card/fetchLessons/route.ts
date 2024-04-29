import {createLesson, getLessonsById, lessonData} from '@/libs/createFlashcards';
import { getUserFromCache } from '@/libs/userManager';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  // Pull user session
  const user = await getUserFromCache(cookies().get("session")?.value);
  console.log(user);
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