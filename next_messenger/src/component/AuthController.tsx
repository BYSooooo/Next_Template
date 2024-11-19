import { GithubAuthProvider, GoogleAuthProvider, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../firebase-config";

export default async function AuthController(service : "Google" | "Github" | "Email" | "Test", email : string) {
    const auth = firebaseAuth;
    try {
        switch(service) {
            case "Google" : 
                await signInWithPopup(auth, new GoogleAuthProvider)
                    .catch((error)=> {
                        console.log(error)
                    })
                break;
            case "Github" :
                await signInWithPopup(auth, new GithubAuthProvider)
            case "Email" : 
                const setting = {
                    url : 'https://next-messenger-nine.vercel.app/',
                    handleCodeInApp : true
                }
                return sendSignInLinkToEmail(firebaseAuth, email, setting)
                    .then(()=> {
                        console.log(email)
                    })
                    .catch((error)=> {
                        console.log(error)
                    });
                
            case "Test" :
                return signInWithEmailAndPassword(firebaseAuth, "test_user01@testemail.com", "Asdf!234")
                    .then((result)=> {
                        console.log(result)
                    })
                    .catch((error)=> {
                        console.log(error)
                    })
                default : break;       
        }
    } catch(error) {
        console.log(error)
    }
}