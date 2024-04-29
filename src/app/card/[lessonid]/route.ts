import { getSpecificLessonById } from "@/libs/createFlashcards";
import { getUserFromCache } from "@/libs/userManager";
import { cookies } from "next/headers";

export async function GET(request: Request, { params }: { params: { lessonid: string } }) {
    // Pull user session
    const user = await getUserFromCache(cookies().get("session")?.value);
    if (!user)
      return new Response('Auth Required', { status: 402 });
  
    try {
        const idNum = parseInt(params.lessonid);
        if(Number.isNaN(idNum))
            return new Response('Invalid lesson ID', { status: 400 });

      const lesson = await getSpecificLessonById(idNum);
  
      if (!lesson) {
        return new Response('Lesson not found', { status: 404 });
      }
  
      // Ensure the requested lesson belongs to the user [This shouldn't happen since the userid is stored in a backend cache]
      if (lesson.user_id !== user.id) {
        return new Response('Unauthorized', { status: 403 });
      }
  
      return new Response(JSON.stringify(lesson), { status: 200 });
  
    } catch (error) {
      console.error("Error fetching lesson:", error);
      return new Response('Internal Server Error', { status: 500 })
    }
  }