import { render } from "@react-email/render";
import React from "react";
import { CSSProperties } from "react";


const headerStyle = {
    logoDiv: {
        display: "flex",
        textDecoration: "none",
        paddingBottom: "10px",
        margin:"auto"
    },
    logoText: {
        fontSize: "64px",
        color: "#FFFF00",
        verticalAlign: "middle"
    }
}

function generateHeader() {
    return (<a href={`${process.env.FRONTEND_URL}/`} style={headerStyle.logoDiv}>
    <img width="72" style={{marginRight: "10px"}} src={`${process.env.FRONTEND_URL}/icons/Fin.svg`}/>
    <span style={headerStyle.logoText}>FinWise</span>
  </a>)
}

function genTemplate(content: React.JSX.Element) {
    return (<table style={{width: "100%", height: "100%", backgroundColor: "#00FFFF"}}>
        <tr>
            <td style={{display: "flex", textAlign: "center", margin: "auto", marginTop: "10px"}}>
                {generateHeader()}
            </td>
        </tr>
        <tr style={{padding: "20px 10px"}}>
            <td>
                {content}
            </td>
        </tr>
    </table>)
}




const pwdResetStyle: {[key: string]: CSSProperties} = {
    contentDiv: {
      backgroundColor: "#FFFFFF",
      borderRadius: "10px",
      margin: "0 100px"
    }
}

export function resetPassword(username: string, resetCode: string) {
    const resetLink = `${process.env.FRONTEND_URL}/pwdreset/${resetCode}`;
    return render(genTemplate(<div style={pwdResetStyle.contentDiv}>
        <h2 style={{padding: "5px", textAlign: "center"}}>Password Reset Request</h2>
        <h3 style={{padding: "5px", textAlign: "center"}}>Hello, {username}!</h3>
        <p style={{padding: "5px", textAlign: "center"}}>A password reset request was made for your account, click on the following link to reset your password: <a href={resetLink}>{resetLink}</a></p>
        <br/>
        <p style={{padding: "5px 0 15px 0", marginBottom: "10px", textAlign: "center"}}>If you did not make this request, please ignore this email. The link will expire in 15 minutes.</p>
    </div>))
}