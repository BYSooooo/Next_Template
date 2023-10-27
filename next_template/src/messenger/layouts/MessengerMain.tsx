'use client'
import React from 'react';

import { firebaseAuth } from '../../../firebaseConfig.js'
import MainAuth from '../components/main/MainAuth';
import MainLogined from './MainLogined';
import { isSignInWithEmailLink, onAuthStateChanged, signInWithEmailLink } from 'firebase/auth';

export default function MessengerMain() {
    const [theme, setTheme] = React.useState('');
    const [isLogin, setIsLogin] = React.useState(false);

    const checkSignInByEmailLink = () => {
        if(isSignInWithEmailLink(firebaseAuth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            console.log(email)
            if(!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(firebaseAuth, email, window.location.href)
                .then((results)=> {
                    window.localStorage.removeItem('emailForSignIn');
                })
                .catch((error)=> {
                    console.log(error.code)
                })
        }
    }
    
    React.useEffect(()=> {
        window.addEventListener('stroage',()=> {
            setTheme(window.localStorage.getItem('mode'))
        })
        checkSignInByEmailLink()    
        onAuthStateChanged(firebaseAuth,(user) => {
            if(user) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
            console.log(user)
        })
    },[])


    console.log(firebaseAuth)
    return (
        <div className="flex container m-20 mx-aut h-auto justify-center">
            <div className={theme}>
                { isLogin ? <MainLogined />: <MainAuth />}
            </div>
        </div>
    )
    
}