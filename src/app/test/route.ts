import {prisma} from "../../libs/db";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const user = await prisma.users.findMany();
    return Response.json(user);
}