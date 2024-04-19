import { redis, prisma, redisPrefix } from "@/libs/db";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

type params = {
    reqKey: string;
}
const rediReqPrefix = `${redisPrefix}RFID:REQUEST:`;

export async function GET(request: NextRequest, params: params) {
    // Sanitatize the request
    const reqKey = params.reqKey;
    if(!reqKey)
        return new Response('Invalid Request', {status: 400});
    
    // Check if the request exists
    const reqData = await redis.get(`${rediReqPrefix}${reqKey}`);
    if(!reqData)
        return new Response('Request not found', {status: 404});

    // Reject if pending
    const [b64Data, status] = reqData.split(':');
    if(status === "pending") {
        await redis.EXPIRE(`${rediReqPrefix}${reqKey}`, 600);
        return new Response('Request is still pending', {status: 400});
    }

    // We can safely assume it's approved
    const SessionID = randomBytes(128).toString('base64');
    await redis.multi()
        .rename(`${rediReqPrefix}${reqKey}`, `${redisPrefix}SESSION:${SessionID}`)
        .set(`${redisPrefix}SESSION:${SessionID}`, Buffer.from(b64Data).toString('utf-8'), {EX: 86400})
        .exec();
    cookies().set('session', SessionID, {httpOnly: true, secure: true, sameSite: 'strict', maxAge: 86400});
    return new Response('RFID Authentication Successful', {status: 200});
    
}

export async function POST(request: NextRequest, params: params) {
    // Sanitatize the request
    const reqKey = params.reqKey;
    const body = await request.json();
    if(!reqKey)
        return new Response('Invalid Request', {status: 400});
    if((await redis.exists(`${rediReqPrefix}${reqKey}`)) === 1) {
        await redis.EXPIRE(`${rediReqPrefix}${reqKey}`, 600);
        return new Response('Request already exists', {status: 400});
    }

    const userData = await prisma.users.findUnique({where: {username: body.username}});
    if(!userData || !userData.rfidkey)
        return new Response("Invalid Username or the account don't have RFID auth enabled", {status: 404});

    // Create the request
    const b64UData = Buffer.from(`${userData.id}:${userData.username}:${userData.email}`, 'utf-8').toString('base64');
    await redis.set(`${rediReqPrefix}${reqKey}`, `${b64UData}:pending`, {EX: 600});
    return new Response('Request Created', {status: 200});
}