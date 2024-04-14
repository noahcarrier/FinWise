import { logout } from "@/libs/userManager";
import { cookies } from "next/headers";


export async function GET(request: Request) {
    const cookie = cookies().get('session');
    if(!cookie)
        return new Response('Invalid Request', {status: 302, headers: {Location: '/'}});
    cookies().delete('session');
    logout(cookie.value);
    return new Response('Logout success!', {status: 302, headers: {Location: '/'}})
}