import { Component } from "react";
import style from "./PasswordReset.module.css";
import React from "react";
import Swal from "sweetalert2";

type props = {
    username: string;
    display: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
}
type state = {
    reqID: string
}

export default class PasswordReset extends Component<props, state> {

    socket?: WebSocket;
    alreadyRequested: boolean = false;
    constructor(props: props) {
        super(props);
        this.state = {
            reqID: ''
        }
    }

    setupSocket = (reqid?: string) => {
        const wsURL = process.env['NEXT_PUBLIC_NFCAUTH_WS'];
        if(!wsURL)
            return Swal.fire('Error', 'Websocket service unavailable; thus, manual checking is required', 'error');
        if(this.socket)
            return;
        this.socket = new WebSocket(`ws://${wsURL}:8080/auth?reqKey=${reqid ?? this.state.reqID}`);
        this.socket.onopen = () => {
            console.log('Connected to WebSocket');
        }
        this.socket.onmessage = async (msg) => {
            if(!this.props.display[0])
                return;
            console.log(msg);
            if(msg.data === 'approved')
                await this.checkStatus();
        }
        
    }

    makeAuthRequest = async () => {
        if(this.props.username === "") {
            this.props.display[1](false);
            return Swal.fire('Error', 'No username found', 'error').then(()=>this.props.display[1](false));
        }
            
        fetch('/auth/rfid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: this.props.username})
        }).then(async res => {
            if(res.status !== 200)
                return Swal.fire('Request Failed', await res.text(), 'error').then(() => {
                    this.props.display[1](false);
                });

            const reqID = (await res.text()).split(':')[1].trim();
            this.setState({reqID});
            this.setupSocket(reqID);
                
        });
    }

    checkStatus = () => {
        if(this.state.reqID === "") {
            return Swal.fire('Error', 'No request ID found', 'error').then(()=>this.props.display[1](false));
        }

        fetch(`/auth/rfid/${this.state.reqID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async res => {
            if(res.status !== 200)
                return Swal.fire('Request Failed', await res.text(), 'error');
            return Swal.fire('Success', await res.text(), 'success').then(()=> {
                this.props.display[1](false);
                this.alreadyRequested = false;
                window.location.replace('/dashboard');
            });
        });
    }

    cancelRequest = () => {
        if(this.state.reqID === "")
            return Swal.fire('Error', 'No request ID found', 'error');
        fetch(`/auth/rfid/${this.state.reqID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async res => {
            if(res.status !== 200)
                return Swal.fire('Request Failed', await res.text(), 'error');
            this.setState({reqID: ''});
            this.props.display[1](false);
            this.alreadyRequested = false;
        });
    }

    render() {
        if(!this.props.display[0] && this.socket) {
            this.socket.close();
            this.socket = undefined;
            this.setState({reqID: ''});
        } else if(this.props.display[0] && !this.socket && !this.alreadyRequested) {
            this.alreadyRequested = true;
            this.makeAuthRequest().then();
        }
            
        return (
            <div className={`${style.mainForm}`} style={{display: this.props.display[0] ? "flex" : "none"}}>
                <div className={style.formBox}>
                    <h1 className="text-center text-black font-bold text-2xl mb-9">RFID Auth Status</h1>
                    <div className="mb-4">
                        <p>{this.state.reqID === "" ? "Waiting to make request..." : "Waiting for approval status..."}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" onClick={this.checkStatus} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                            Check Auth
                        </button>
                        <button type="submit" onClick={this.cancelRequest} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" style={{opacity: this.props.display[0] ? "0.5" : "0"}}>
                            Close
                        </button>
                    </div>
                </div>
                <div className={style.formBkgnd}></div>
            </div>
        )
    }
}