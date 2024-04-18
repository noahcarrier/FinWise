'use server'
import { cookies } from "next/headers";
import { getUserFromCache } from "./userManager";
import { redirect } from "next/navigation";

/**
 * Automatically handles cookie fetching from request data from apps/, should be used instead of getUserFromCache...
 * @returns userProfile if session is valid, otherwise undefined
 */
export async function getCacheFromApp() {
    const cookie = cookies().get('session');
    if(!cookie)
        return;
    const auth = getUserFromCache(cookie.value);
    if(!auth) {
        cookies().delete('session');
        return;
    }
    return auth;
}

/**
 * Workaround for nextjs's stupid server rendering limitation
 */
export async function isUserAuth(redirectUser?: boolean) {
    const cookieVal = cookies().get('cookies');
    const userData = getUserFromCache(cookieVal?.value);
    if(!userData || !cookieVal)
        if(redirectUser)
            redirect('/login');
        else
            return false;

    cookies().set('session', cookieVal.value, {maxAge: 86400});
    return  true;
}
