import { Component, ForwardedRef, RefObject, forwardRef } from "react";
import style from "./PasswordReset.module.css";
import React from "react";

type props = {
    display: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
}

export default class PasswordReset extends Component<props> {
    constructor(props: props) {
        super(props);
    }

    render() {
        return (
            <div className={`${style.mainForm}`} style={{display: this.props.display[0] ? "flex" : "none"}}>
                <div className={style.formBox}>
                    <h1 className="text-center text-black font-bold text-2xl mb-9">Request Password Reset</h1>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                            Reset Password
                        </button>
                    </div>
                </div>
                <div className={style.formBkgnd} onClick={()=>this.props.display[1](false)} style={{opacity: this.props.display[0] ? "0.5" : "0"}}></div>
            </div>
        )
    }
}