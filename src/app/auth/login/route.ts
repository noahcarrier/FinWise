import {authenticate} from '../../../libs/userManager';
import { cookies } from 'next/headers';

type request = {
    username: string;
    password: string;
}

export async function POST(request: Request) {
    const req = await request.json();
    const authData = await authenticate(req.username, req.password);
    if(!authData)
        return new Response('Authentication Failed, bad username/password', {status: 401});
    cookies().set('session', authData.sessionKey, {httpOnly: true, secure: true, sameSite: 'strict'});
    return new Response('Authentication successful', {status: 200});
}