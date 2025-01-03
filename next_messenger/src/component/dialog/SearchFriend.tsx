"use client";

import React from 'react';
import { controlDialog } from "../../redux/features";
import { useAppDispatch } from "../../redux/hooks";

export default function SearchFriend() {
    const dispatch = useAppDispatch()
    const [checked, setChecked] = React.useState(0)

    const onClickClose = ()=> {
        dispatch(controlDialog({ openYn : false, contentName : "", size : "",title : "",}))
    }
    

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row divide-solid divide-x gap-2">
                {/*  Left Side : Search, List */}
                <div className="flex flex-col gap-2">
                    {/* Radio Button Group*/}
                    <div className="flex flex-row gap-3">
                        <div className="flex flex-row text-center w-fit">
                            <input 
                                checked={checked === 0}
                                onChange={()=>setChecked(0)}
                                className="default-radio mr-2" 
                                type="radio"
                            />
                            <label className="text-sm">Email</label>
                        </div>
                        <div className="flex flex-row text-center w-fit">
                            <input
                                checked={checked === 1}
                                onChange={()=> setChecked(1)} 
                                className="default-radio mr-2" 
                                type="radio"/>
                            <label className="text-sm">DisplayName</label>
                        </div>
                    </div>
                    <input
                        placeholder="Search..." 
                        className="default-input">
                    </input>
                </div>
                {/* Right Side : Selected Friend Inform */}
                <div className="flex flex-col">
                    This is Info Part
                </div>
            </div>
            
            
            <div className="">

            </div>
            <div className="flex flex-row justify-end">
                <button 
                    className="default-button"
                    onClick={onClickClose}>
                    Close
                </button>
            </div>
        </div>
    )
}