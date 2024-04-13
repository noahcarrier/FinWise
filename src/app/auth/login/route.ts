import {register} from '../../../libs/userManager';

type request = {
    username: string;
    password: string;
}

export async function POST(request: Request) {
    const req = await request.json()
}