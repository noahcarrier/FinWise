import {authenticate} from '../../../libs/userManager';
import { cookies } from 'next/headers';

type request = {
    username: string;
    password: string;
}

export async function POST(request: Request) {
    const req: request = await request.json();

    // DEV MODE
    if(!req.username || !req.password && process.env.NODE_ENV === 'development') {
        cookies().set('session', 'DEV_SESSION', {httpOnly: true, secure: true, sameSite: 'strict', maxAge: 86400});
        return new Response('Authentication successful: DEV CREDENTIAL', {status: 200});
    }

    if(!req.username || !req.password)
        return new Response('One or more required fields are missing', {status: 400});
    
    const authData = await authenticate(req.username, req.password);
    if(!authData)
        return new Response('Authentication Failed, bad username/password', {status: 401});
    // Cookie live for 1hr
    cookies().set('session', authData.sessionKey, {httpOnly: true, secure: true, sameSite: 'strict', maxAge: 86400});
    return new Response('Authentication successful', {status: 200});
}