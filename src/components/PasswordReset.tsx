import { Component } from "react";
import style from "./PasswordReset.module.css";
import React from "react";
import Swal from "sweetalert2";

type props = {
    display: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
}

export default class PasswordReset extends Component<props> {
    usernameRef = React.createRef<HTMLInputElement>();
    resetBtnRef = React.createRef<HTMLButtonElement>();
    constructor(props: props) {
        super(props);
    }

    resetRequest = () => {
        if(!this.usernameRef.current?.value)
            return Swal.fire('Error', 'Username is required to initiate password reset request', 'error');

        this.resetBtnRef.current?.setAttribute('disabled', 'true');
        fetch('/auth/pwdreset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: this.usernameRef.current?.value})
        }).then(async res => {
            this.resetBtnRef.current?.removeAttribute('disabled');
            if(res.status === 200)
                return Swal.fire('Success', await res.text(), 'success').then(() => {
                    if(this.usernameRef.current)
                        this.usernameRef.current.value = '';
                    this.props.display[1](false);
                });

            Swal.fire('Error', await res.text(), 'error')
        });
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
                            ref={this.usernameRef}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" onClick={this.resetRequest} ref={this.resetBtnRef} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                            Reset Password
                        </button>
                    </div>
                </div>
                <div className={style.formBkgnd} onClick={()=>this.props.display[1](false)} style={{opacity: this.props.display[0] ? "0.5" : "0"}}></div>
            </div>
        )
    }
}