import { redis, redisPrefix } from "@/libs/db";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

type params = {
    reqKey: string;
}
const rediReqPrefix = `${redisPrefix}RFID:REQUEST:`;
const redisReqIDPrefix = `${redisPrefix}RFID:ID:`;

export async function GET(request: NextRequest, {params}: {params: params}) {
    // Sanitatize the request
    const reqid = params.reqKey;
    if(!reqid)
        return new Response('Invalid Request', {status: 400});
    
    // Check if the request exists
    const reqKey = await redis.get(`${redisReqIDPrefix}${reqid}`);
    if(!reqKey)
        return new Response('Request not found', {status: 404});

    // Reject if pending
    const reqData = await redis.get(`${rediReqPrefix}${reqKey}`);
    if(!reqData)
        return new Response('Request not found', {status: 404});

    const [reqID, b64Data, status] = reqData.split(':');
    if(status === "pending") {
        await redis.multi()
            .expire(`${rediReqPrefix}${reqKey}`, 600)
            .expire(`${redisReqIDPrefix}${reqid}`, 600)
            .exec();
        return new Response('Request is still pending', {status: 400});
    }

    // We can safely assume it's approved
    const SessionID = randomBytes(128).toString('base64');
    await redis.multi()
        .rename(`${rediReqPrefix}${reqKey}`, `${redisPrefix}SESSION:${SessionID}`)
        .set(`${redisPrefix}SESSION:${SessionID}`, Buffer.from(b64Data).toString('utf-8'), {EX: 86400})
        .del(`${redisReqIDPrefix}${reqid}`)
        .exec();
    cookies().set('session', SessionID, {httpOnly: true, secure: true, sameSite: 'strict', maxAge: 86400});
    return new Response('RFID Authentication Successful', {status: 200});
    
}

export async function DELETE(request: NextRequest, {params}: {params: params}) {
    // Sanitatize the request
    const reqid = params.reqKey;
    if(!reqid)
        return new Response('Invalid Request', {status: 400});
    
    // Check if the request exists
    const reqKey = await redis.get(`${redisReqIDPrefix}${reqid}`);
    if(!reqKey)
        return new Response('Request not found', {status: 404});

    // Reject if pending
    const reqData = await redis.get(`${rediReqPrefix}${reqKey}`);
    if(!reqData)
        return new Response('Request not found', {status: 404});

    const [b64Data, status] = reqData.split(':');
    if(status === "pending") {
        await redis.multi()
            .del(`${rediReqPrefix}${reqKey}`)
            .del(`${redisReqIDPrefix}${reqid}`)
            .exec();
        return new Response('Request has been cancelled', {status: 200});
    }

    return new Response('Request has already been approved', {status: 400});
}