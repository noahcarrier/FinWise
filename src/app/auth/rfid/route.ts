import { NextRequest } from "next/server";
import { redis, prisma, redisPrefix } from "@/libs/db";
import { randomBytes } from "crypto";

const rediReqPrefix = `${redisPrefix}RFID:REQUEST:`;
const redisReqIDPrefix = `${redisPrefix}RFID:ID:`;

export async function POST(request: NextRequest) {
    // Sanitatize the request
    const body = await request.json();
    if(!body || !body.username)
        return new Response('Invalid Request', {status: 400});

    // Check RFID auth eligibility
    const userData = await prisma.users.findUnique({where: {username: body.username}});
    if(!userData || !userData.rfidkey)
        return new Response("Invalid Username or the account don't have RFID auth enabled", {status: 404});
    if((await redis.exists(`${rediReqPrefix}${userData.rfidkey}`)) === 1) {
        await redis.EXPIRE(`${rediReqPrefix}${userData.rfidkey}`, 600);
        return new Response('Request already exists', {status: 400});
    }

    // Create the request
    const reqID = randomBytes(32).toString('hex');
    const b64UData = Buffer.from(`${userData.id}:${userData.username}:${userData.email}`, 'utf-8').toString('base64');
    await redis.set(`${rediReqPrefix}${userData.rfidkey}`, `${reqID}:${b64UData}:pending`, {EX: 600});

    await redis.set(`${redisReqIDPrefix}${reqID}`, userData.rfidkey, {EX: 600});
    return new Response(`Request Created:${reqID}`, {status: 200});
}