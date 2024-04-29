'use server'

import { prisma, redis, redisPrefix } from '@/libs/db';
import { randomBytes, scryptSync } from 'crypto';
import sendgrid from '@sendgrid/mail';
import { resetPassword } from '@/libs/EmailManager';

type POSTReq = {
    username: string;
}

type PATCHReq = {
    key: string;
    password: string;
}

// Create a new password request request
export async function POST(request: Request) {
    // Sanitation check
    if(!process.env.SENDGRID_KEY)
        return new Response('Email service misconfigured, password reset is not currently supported', {status: 500});

    // Fetch username and check its userID
    const req: POSTReq = await request.json();
    if(!req.username)
        return new Response('Username is required', {status: 400});

    const userObj = await prisma.users.findUnique({
        where: {
            username: req.username
        }
    });
    if(!userObj)
        return new Response('If the account is found, a password reset email will be sent', {status: 200});

    // Delete existing request if any
    const existingRequest = await redis.get(`${redisPrefix}PWDRESET:USER:${userObj.id}`);
    if(existingRequest)
        await redis.del(`${redisPrefix}PWDRESET:KEY:${existingRequest}`);

    // setup the request that expires in 15 minutes
    const requestKey = randomBytes(32).toString('hex');
    await redis.set(`${redisPrefix}PWDRESET:USER:${userObj.id}`, requestKey, {EX: 900});
    await redis.set(`${redisPrefix}PWDRESET:KEY:${requestKey}`, userObj.id.toString(), {EX: 900});

    // Send the email
    sendgrid.setApiKey(process.env.SENDGRID_KEY);
    await sendgrid.send({
        to: userObj.email,
        from: 'noreply@zhiyan114.com',
        subject: "FinWise - Password Reset",
        html: resetPassword(userObj.username, requestKey)
    });

    return new Response('If the account is found, a password reset email will be sent', {status: 200});
}

// Actually completing the request
export async function PATCH(request: Request) {

    // Fetch the request key and the new password
    const req: PATCHReq = await request.json();
    if(!req.key || !req.password)
        return new Response("Missing fields that's required for password change", {status: 400});

    // Check if the key is valid
    const userID = await redis.get(`${redisPrefix}PWDRESET:KEY:${req.key}`);
    if(!userID)
        return new Response('Invalid Reset Request', {status: 400});

    // Delete the key and the request
    await redis.del(`${redisPrefix}PWDRESET:KEY:${req.key}`);
    await redis.del(`${redisPrefix}PWDRESET:USER:${userID}`);

    // Update the password
    const saltBuffer = randomBytes(16);
    const passwordHash = scryptSync(req.password, saltBuffer, 64);
    await prisma.users.update({
        where: {
            id: parseInt(userID)
        },
        data: {
            salt: saltBuffer.toString('base64'),
            password: passwordHash.toString('base64')
        }
    });

    return new Response('Password reset successful! You may now login again.', {status: 200});
}