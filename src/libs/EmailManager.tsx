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
        color: "rgb(255,255,0)",
    }
}

function generateHeader() {
    return (<a href={`${process.env.FRONTEND_URL}/`} style={headerStyle.logoDiv}>
    <img width="128" src={`${process.env.FRONTEND_URL}/icons/Fin.svg`}/>
    <span style={headerStyle.logoText}>FinWise</span>
  </a>)
}

const pwdResetStyle: {[key: string]: CSSProperties} = {
    mainDiv: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "centers",
        flexDirection: "row",
    },
    background: {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        opacity: 1,
        zIndex: -1,
        backgroundColor: "rgb(0, 255, 255)",
    },
    contentDiv: {
      backgroundColor: "rgb(255,2555,255)",
      borderRadius: "10px",
    }
}


// export function resetPassword(username: string, resetCode: string) {
//     const resetLink = `${process.env.FRONTEND_URL}/pwdreset/${resetCode}`;
//     return render(<div style={pwdResetStyle.mainDiv}>
//         {generateHeader()}
//         <div style={pwdResetStyle.contentDiv}>
//             <h2>Password Reset Request</h2>
//             <h3>Hello, {username}!</h3>
//             <p>A password reset request was made for your account, click on the following link to reset your password: <a href={resetLink}>{resetLink}</a></p>
//             <br/>
//             <p>If you did not make this request, please ignore this email. The link will expire in 15 minutes.</p>
//         </div>
//         <div style={pwdResetStyle.background}/>
//       </div>)
// }


export function resetPassword(username: string, resetCode: string) {
    const resetLink = `${process.env.FRONTEND_URL}/pwdreset/${resetCode}`;
    return render(<table>
        <tr>
            <td>
                {generateHeader()}
            </td>
        </tr>
        <tr>
            <td>
                <div style={pwdResetStyle.contentDiv}>
                    <h2>Password Reset Request</h2>
                    <h3>Hello, {username}!</h3>
                    <p>A password reset request was made for your account, click on the following link to reset your password: <a href={resetLink}>{resetLink}</a></p>
                    <br/>
                    <p>If you did not make this request, please ignore this email. The link will expire in 15 minutes.</p>
                </div>
            </td>
        </tr>
    </table>)
}