import { GetServerSidePropsContext } from "next";
import { redis,redisPrefix } from "@/libs/db";
import "../../app/globals.css";
import { Fragment, createRef } from "react";
import Navbar from "@/components/Navbar";
import Swal from "sweetalert2";

type props = {
    resetKey: string;
}



const resetPWD = (props: props) => {
    const passwordRef = createRef<HTMLInputElement>();
    const repeatPasswordRef = createRef<HTMLInputElement>();
    const resetBtnRef = createRef<HTMLButtonElement>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const password = passwordRef.current?.value;
        const repeatPassword = repeatPasswordRef.current?.value;

        if(password === undefined || repeatPassword === undefined)
            return Swal.fire('Error', 'ERROR', 'error');; // This shouldn't happen :/

        if(password !== repeatPassword)
            return Swal.fire('Error', 'Passwords do not match', 'error');

        // Validate password security (Just 8 character and some number for now)
        if(password.length < 8 || !/\d/.test(password))
            return Swal.fire('Form Validation', 'Password must be at least 8 characters long and contain at least one number', 'error');

        // Send the form data to the server
        resetBtnRef.current?.setAttribute('disabled', 'true');
        fetch('/auth/pwdreset', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({key: props.resetKey, password})
        }).then(async res => {
            if(res.status !== 200)
                return Swal.fire('Error', await res.text(), 'error').then(() => {
                    resetBtnRef.current?.removeAttribute('disabled');
                });
            Swal.fire('Success', await res.text(), 'success').then(() => {
                // Redirect user to the login
                window.location.replace('/login');
            });
        });
    }

    return (<Fragment>
                <div className="flex flex-col bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
                    <Navbar isAuthed={false}/>
                    <div className="flex justify-center items-center flex-1">
                        <div className="w-full max-w-xl">
                            <form onSubmit={handleSubmit} className="bg-gradient-to-b from-transparent to-white shadow-md rounded-full p-12 mb-2">
                                <h1 className="text-center text-black font-bold text-2xl mb-9">Password Reset</h1>
                                <div className="mb-6">
                                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                        ref={passwordRef}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="Repeat Password" className="block text-gray-700 text-sm font-bold mb-2">Repeat Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                        ref={repeatPasswordRef}
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <button type="submit" ref={resetBtnRef} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
}

export default resetPWD;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    // Check the reset request
    const reqID = context.params?.reqid;
    if(!reqID)
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }

    // Dev Mode
    if(process.env.NODE_ENV === 'development' && reqID === 'devpreview')
        return {
            props: {
                resetKey: 'devpreview_key'
            }
        }

    const userID = await redis.get(`${redisPrefix}PWDRESET:KEY:${reqID}`)
    if(!userID)
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }

    return {
        props: {
            resetKey: reqID
        }
    }
    
}