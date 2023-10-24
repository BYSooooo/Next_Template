import { firebaseAuth } from "../../../firebaseConfig"
import { signOut } from "firebase/auth"

export default function MainLogined () {

    const onClickSignOut = () => {
        signOut(firebaseAuth)
        
    }

    return (
        <div>
            <h1>
                Logined!
            </h1>
            <h4>
              {firebaseAuth.currentUser.email}
            </h4>
            <button
                onClick={onClickSignOut}>
                    SignOut
            </button>
        </div>
    )
}