import { updateAttemptStatus } from "@/libs/createFlashcards";
import { getUserFromCache } from "@/libs/userManager";
import { cookies } from "next/headers";

export async function PATCH(request: Request, { params }: { params: { questionid: string} }) {
    // Pull user session
    const user = await getUserFromCache(cookies().get("session")?.value);
    if (!user)
      return new Response('Auth Required', { status: 402 });
  
    try {
        const body = await request.json();
        const idNum = parseInt(params.questionid);
        if(Number.isNaN(idNum))
            return new Response('Invalid question ID', { status: 400 });

        if(!body.attemptResult)
          return new Response('Invalid attempt result', { status: 400 });

      const question = await updateAttemptStatus(idNum, body.attemptResult);
  
      if (!question) {
        return new Response('Question not found', { status: 404 });
      }
  
      return new Response(JSON.stringify(question), { status: 200 });
  
    } catch (error) {
      console.error("Error patching question:", error);
      return new Response('Internal Server Error', { status: 500 })
    }
  }