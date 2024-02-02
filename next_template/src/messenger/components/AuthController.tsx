import { GithubAuthProvider, GoogleAuthProvider, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithEmailLink, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../../firebaseConfig";

export default function AuthController(service : "Google" | "Github" | "Email" | "Test", email? : string) {
    const auth = firebaseAuth
    let provider = null

    const authForProvider = (name : string) => {
        switch(name) {
            case "Google" :
                console.log("Google")
                provider = new GoogleAuthProvider();
                break;
            case "Github" : 
                console.log("Github")
                provider = new GithubAuthProvider();
                break;
            default : 
                break;
        }
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
            }).catch((error) => {
                console.log(error)
            })
    }
    const authForEmail = () => {
        const actionSetting = {
            //url : 'http://localhost:3000/messenger',
            url : 'https://next-template-alpha-ten.vercel.app/messenger',
            handleCodeInApp : true
        }
        sendSignInLinkToEmail(firebaseAuth, email, actionSetting)
            .then(()=> {
                window.localStorage.setItem('emailForSignIn',email)
            })
            .catch((error) => {
                console.log(error.code)
            })
    }
    const authForTest = () => {
        signInWithEmailAndPassword(firebaseAuth,"test_user02@test.com","test1234")
            .then((result)=> {
                console.log(result);
            })
            .catch((error)=> {
                console.log(error)
            })
    }

    switch(service) {
        case "Google":
            authForProvider(service)
            break;
        case "Github" :
            authForProvider(service)
            break;
        case "Email" : 
            authForEmail()
            break;
        case "Test" : 
            authForTest()
            break;
        default : break;
    }
}