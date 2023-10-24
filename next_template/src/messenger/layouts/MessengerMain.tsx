'use client'
import React from 'react';

import { firebaseAuth } from '../../../firebaseConfig.js'
import MainAuth from '../components/main/MainAuth';
import MainLogined from './MainLogined';
import { onAuthStateChanged } from 'firebase/auth';

export default function MessengerMain() {
    const [theme, setTheme] = React.useState('');
    const [isLogin, setIsLogin] = React.useState(false);
    
    React.useEffect(()=> {
        window.addEventListener('stroage',()=> {
            setTheme(window.localStorage.getItem('mode'))
        })    
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