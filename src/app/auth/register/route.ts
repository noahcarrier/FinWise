import {register} from '../../../libs/userManager';
import { cookies } from 'next/headers'

type request = {
    username: string;
    email: string;
    password: string;
}

export async function POST(request: Request) {
    const {username, email, password}: request = await request.json();
    const authData = await register(username, email, password);
    if(!authData)
        return new Response('An error occurred while creating your account', {status: 500});

    cookies().set('session', authData.sessionKey, {httpOnly: true, secure: true, sameSite: 'strict'})
    return new Response('Account created successfully', {status: 200});
}