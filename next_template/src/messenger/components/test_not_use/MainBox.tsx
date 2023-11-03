import React from 'react';

import BasicButton from './BasicButton'
import AuthModal from '../login/EmailAuthModal';

export default function MainBox() {
    const [email, setEmail] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);
    
    const loginClick = ()=> {
        
        console.log(`Email : ${email}`)
        console.log(`Pwd : ${pwd}`)
          
    }
    const enrollClick = () => {

    }

    const onClickClose = (pressYn : boolean) => {
        console.log(pressYn)
        setShowModal(false)
    }

    const onChangeHandler = (event : React.FormEvent<HTMLInputElement>) => {
        switch (event.currentTarget.id) {
            case 'main_inputedEmail' : 
                setEmail(event.currentTarget.value);
                break;
            case 'main_inputedPwd' : 
                setPwd(event.currentTarget.value)
                break;
            default  : break;
        }
    }
    return (
            <div className="box-content bg-stone-100  dark:bg-slate-800 shadow-md rounded-xl w-96 h-96 p-2.5">
                <h1 className="text-3xl text-center font-bold">
                    Welcome Messenger
                </h1>
                <div className='h-1/4'>

                </div>
                <label className="block my-3">
                    <span className='font-bold'>
                        Email
                    </span>
                    <input
                        onChange={onChangeHandler}
                        id='main_inputedEmail'
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 focus:ring-blue-300 sm:text-sm sm:leading-6"
                        placeholder="input Email"
                    />
                </label>
                <label className="block my-3">
                    <span className='font-bold'>
                        Password
                    </span>
                    <input
                        onChange={onChangeHandler}
                        id='main_inputedPwd'
                        type="password"
                        className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 sm:text-sm sm:leading-6"
                        placeholder="input password" />
                </label>
                <div className='my-3'>
                    <BasicButton context='Login' onClicked={loginClick}/>
                </div>
                <div className='my-3'>
                    <BasicButton context="Enroll" onClicked={()=>setShowModal(true)} />
                </div>
                {showModal ? <AuthModal onClose={onClickClose} /> : null}
            </div>
    )
}