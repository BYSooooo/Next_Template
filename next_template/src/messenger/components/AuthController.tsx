import { GithubAuthProvider, GoogleAuthProvider, sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../../firebaseConfig";

export default function AuthController(service : "Google" | "Github" | "Email" | "Test", email? : string) {
    const auth = firebaseAuth
    let provider = null

    const authForProvider = (name : string) => {
        switch(name) {
            case "Google" :
                provider = new GoogleAuthProvider();
                break;
            case "Github" : 
                provider = new GithubAuthProvider();
                break;
            default : 
                break;
        }
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
            })
    }
    const authForEmail = () => {
        const actionSetting = {
            url : 'https://next-template-alpha-ten.vercel.app/messenger',
            handleCodeInApp : true,
            dynamicLinkDomain : 'example.page.link'
        }
        sendSignInLinkToEmail(firebaseAuth, email, actionSetting);
    }

    switch(service) {
        case "Google" || "Github ": 
            authForProvider(service)
        case "Email" || "Test" : 
            authForEmail()
            break;
        default : break;
    }
    
    

    

}