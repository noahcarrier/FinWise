import { randomUUID, scryptSync, timingSafeEqual } from "crypto";
import {prisma, redis} from "./db";

class userProfile {
    public id;
    public username;
    public email;

    constructor(id: number, username: string, email: string) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    // Function implementation such as getting user flashcard data and stuff
}

export type authData = {
    sessionKey: string;
    user: userProfile;
}

/**
 * Authenticates and create a user session in redis
 * @param username Self-explanatory
 * @param password Self-explanatory, pre-hashed password
 * @returns undefined if authentication fails, otherwise returns an authData object (containing sessionKey and user object)
 */
export async function authenticate(username: string, password: string): Promise<authData | undefined> {
    const UUID = randomUUID({disableEntropyCache: true}); // Keep things simple for now

    // Search for user
    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    })
    if(!user)
        return;

    // Hash the password and authenticate
    const passwordHash = scryptSync(password, user.salt, 64, {cost: 16384*2});
    if(!timingSafeEqual(passwordHash, Buffer.from(user.password, 'base64'))) 
        return;

    // Create session (expires in 24hrs)
    await redis.set(`SESSION:${UUID}`, `${user.id}:${user.username}:${user.email}`, {EX: 86400});
    return {
        sessionKey: UUID, 
        user: new userProfile(user.id, user.username, user.email)
    };
}

export function register(password: string) {

}

export function logout() {

}

export function getUserFromCache(sessionKey: string): userProfile | undefined {
    return;
}