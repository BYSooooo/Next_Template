'use client'
import React from 'react';

import MainBox from '../components/main/MainBox';
import { firebaseAuth } from '../../../firebaseConfig.js'

export default function MessengerMain() {
    const [theme, setTheme] = React.useState('');
    
    React.useEffect(()=> {
        window.addEventListener('stroage',()=> {
            setTheme(window.localStorage.getItem('mode'))
        })    
    },[])

    console.log(firebaseAuth.currentUser)
    return (
        <div className="flex container m-20 mx-aut h-auto justify-center">
            <div className={theme}>
                <MainBox />
            </div>
        </div>
    )
    
}