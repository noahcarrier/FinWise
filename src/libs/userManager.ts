import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import {prisma, redis, redisPrefix} from "./db";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { IncomingMessage, ServerResponse } from "http";
import { NextPageContext } from "next";

export type userProfile_T = InstanceType<typeof userProfile>;

class userProfile {
    public readonly id: number;
    public readonly username: string;
    public readonly email: string;

    constructor(id: number, username: string, email: string) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    /**
     * Changing current user's passsword
     * @param oldPassword User's current password
     * @param newPassword User's new password
     * @returns true if password is successfully changed, otherwise false
     */
    public async changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
        // Search for user
        const user = await prisma.users.findUnique({
            where: {
                id: this.id
            }
        })
        if(!user)
            return false;

        // Hash the password and authenticate
        const saltBuffer = Buffer.from(user.salt, 'base64');
        const oldPasswordHash = scryptSync(oldPassword, saltBuffer, 64, {cost: 16384*2});
        if(!timingSafeEqual(oldPasswordHash, Buffer.from(user.password, 'base64')))
            return false;

        // Update password
        const newPasswordHash = scryptSync(newPassword, saltBuffer, 64, {cost: 16384*2});
        await prisma.users.update({
            where: {
                id: this.id
            },
            data: {
                password: newPasswordHash.toString('base64')
            }
        });
        return true;
    }
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
    const UUID = randomBytes(128).toString('base64'); // Keep things simple for now

    // Search for user
    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    })
    if(!user)
        return;

    // Hash the password and authenticate
    const saltBuffer = Buffer.from(user.salt, 'base64');
    const passwordHash = scryptSync(password, saltBuffer, 64);
    if(!timingSafeEqual(passwordHash, Buffer.from(user.password, 'base64')))
        return;

    // Create session (expires in 24hrs)

    await redis.set(`${redisPrefix}SESSION:${UUID}`, `${user.id}:${user.username}:${user.email}`, {EX: 86400});
    return {
        sessionKey: UUID, 
        user: new userProfile(user.id, user.username, user.email)
    };
}

/**
 * Create a new user profile and immadiately start a session for it
 * @param username Self-explanatory
 * @param email Self-explanatory
 * @param password Self-explanatory, pre-hashed password
 */
export async function register(username: string, email: string, password: string): Promise<authData | undefined> {
    // Account already exists?
    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    })
    if(user)
        return;

    // Create user
    const saltBuffer = randomBytes(16);
    const passwordHash = scryptSync(password, saltBuffer, 64);
    const newUser = await prisma.users.create({
        data: {
            username: username,
            email: email,
            salt: saltBuffer.toString('base64'),
            password: passwordHash.toString('base64')
        }
    });

    // Create session (expires in 24hrs)
    const UUID = randomBytes(128).toString('base64');
    await redis.set(`${redisPrefix}SESSION:${UUID}`, `${newUser.id}:${newUser.username}:${newUser.email}`, {EX: 86400});
    return {
        sessionKey: UUID, 
        user: new userProfile(newUser.id, newUser.username, newUser.email)
    };
}

/**
 * Destroys a user session from the cache
 * @param sessionKey Self-explanatory
 */
export async function logout(sessionKey: string) {
    await redis.del(`${redisPrefix}SESSION:${sessionKey}`);
}


interface connT {
    req: IncomingMessage;
    res?: ServerResponse<IncomingMessage>;
};

/**
 * Validate if the user already has a valid session (and renew the expiration time)
 * @param sessionKey Self-emplanatory, accept undefined value to make checks easier
 * @returns returns userProfile if session is valid, otherwise undefined
 */
export async function getUserFromCache(sessionKey?: string): Promise<userProfile | undefined> {
    if(!sessionKey)
        return;

    const userData = await redis.get(`${redisPrefix}SESSION:${sessionKey}`);
    if(!userData)
        return;

    // Update Session Expiration and return user
    await redis.expire(`${redisPrefix}SESSION:${sessionKey}`, 86400);

    // Parse and return the object
    const [id, username, email] = userData.split(':');
    return new userProfile(parseInt(id), username, email);
}

/**
 * Automatically handles cookie fetching from request data from pages/, should be used instead of getUserFromCache..
 * @param conn Nextjs connection object
 * @returns userProfile if session is valid, otherwise undefined
 */
export async function getCacheFromPage(conn: connT | NextPageContext): Promise<userProfile | undefined> {
    const sessionKey = getCookie('session', conn);
    if(!sessionKey)
        return;

    // DEV MODE
    if(sessionKey === 'DEV_SESSION' && process.env.NODE_ENV === 'development')
        return new userProfile(0, 'DEV_USERNAME', 'DEV@email.tld');

    const data = await getUserFromCache(sessionKey);
    if(!data)
        return deleteCookie('session', conn) as undefined;

    setCookie('session', sessionKey, { ...conn, maxAge: 86400});
    return data;
}

