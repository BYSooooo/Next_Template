import { GithubAuthProvider, GoogleAuthProvider, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../firebase-config";

export default async function AuthController(service : "Google" | "Github" | "Email" | "Test", email : string) {
    const auth = firebaseAuth;

    try {
        switch(service) {
            case "Google" : 
                return signInWithPopup(auth, new GoogleAuthProvider())
                    .then((credential)=> {
                        return { result : true, content : credential};
                    }).catch((error)=> {
                        return { result : false, content : error}
                    })
            case "Github" :
                return signInWithPopup(auth, new GithubAuthProvider())
                    .then((credential)=> {
                        return { result : true, content : credential};
                    })
                    .catch((error)=> {
                        return { result : false, content : error}
                    })
            
            case "Email" : 
                const setting = {
                    url : 'https://next-messenger-nine.vercel.app/',
                    handleCodeInApp : true
                }
                return sendSignInLinkToEmail(firebaseAuth, email, setting)
                    .then((credential)=> {
                        return { result : true, content : credential};
                    })
                    .catch((error)=> {
                        return { result : false, content : error};
                    });
              
            case "Test" :
                return signInWithEmailAndPassword(firebaseAuth, "test_user03@testemail.com", "Asdf!234")
                    .then((credential)=> {
                        return { result : true, content : credential};
                    })
                    .catch((error)=> {
                        return { result : false, content : error};
                    })
              
        }
    } catch(error) {
        console.log(error)
    }
}