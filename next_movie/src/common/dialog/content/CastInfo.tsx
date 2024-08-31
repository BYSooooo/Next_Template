"use client";

import React from 'react';
import { useAppSelector } from "../../../redux/hooks"
import { getPerson } from '../../../components/fetchData';

export default function CastInfo() {
    const staffId = useAppSelector((state)=> state.dialogReducer.extraInfo)

    React.useEffect(()=> {
        getPerson(staffId).then((result)=> {
            console.log(result)
        })
    },[])


    return (
        <>
        
        </>
    )
}