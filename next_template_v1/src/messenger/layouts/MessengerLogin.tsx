'use client'

import React from 'react';

import { firebaseAuth } from '../../../firebaseConfig.js'
import MainAuth from './MainAuth';
import MessengerMain from './MessengerMain'
import { isSignInWithEmailLink, onAuthStateChanged, signInWithEmailLink } from 'firebase/auth';

export default function MessengerLogin() {
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
        })
    },[])

    return (
        <div className="flex container m-20 mx-auto h-auto justify-center">
            <div className={theme}>
                { isLogin ? <MessengerMain />: <MainAuth />}
            </div>
        </div>
    )
    
}