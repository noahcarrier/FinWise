import { render } from "@react-email/render";
import { CSSProperties } from "react";


const headerStyle = {
    logoDiv: {
        display: "flex",
        textDecoration: "none",
        paddingBottom: "10px",
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



const pwdResetStyle: {[key: string]: CSSProperties} = {
    contentDiv: {
      backgroundColor: "#FFFFFF",
      borderRadius: "10px",
    }
}

export function resetPassword(username: string, resetCode: string) {
    const resetLink = `${process.env.FRONTEND_URL}/pwdreset/${resetCode}`;
    return render(<table style={{width: "100%", height: "100%", backgroundColor: "#00FFFF"}}>
        <tr>
            <td style={{textAlign: "center", margin: "auto", marginTop: "10px"}}>
                {generateHeader()}
            </td>
        </tr>
        <tr style={{padding: "20px 10px"}}>
            <td>
                <div style={pwdResetStyle.contentDiv}>
                    <h2 style={{padding: "5px", textAlign: "center"}}>Password Reset Request</h2>
                    <h3 style={{padding: "5px", textAlign: "center"}}>Hello, {username}!</h3>
                    <p style={{padding: "5px", textAlign: "center"}}>A password reset request was made for your account, click on the following link to reset your password: <a href={resetLink}>{resetLink}</a></p>
                    <br/>
                    <p style={{padding: "5px", textAlign: "center"}}>If you did not make this request, please ignore this email. The link will expire in 15 minutes.</p>
                </div>
            </td>
        </tr>
    </table>)
}