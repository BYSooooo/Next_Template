"use client";

import { controlDialog } from "../../redux/features";
import { useAppDispatch } from "../../redux/hooks";

export default function SearchFriend() {
    const dispatch = useAppDispatch()

    const onClickClose = ()=> {
        dispatch(controlDialog({ openYn : false, contentName : "", size : "",title : "",}))
    }
        

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row">
                {/*  Left Side : Search, List */}
                <div className="flex flex-col">
                    {/* Radio Button Group*/}
                    <div className="flex flex-row gap-3">
                        <div className="flex flex-row text-center w-fit">
                            <input className="default-radio mr-2" type="radio"/>
                            <p className="text-sm">Email</p>
                        </div>
                        <div className="flex flex-row text-center w-fit">
                            <input className="default-radio mr-2" type="radio"/>
                            <p className="text-sm">DisplayName</p>
                        </div>
                    </div>
                </div>
                <div className="w-1 bg-white "/>
                {/* Right Side : Selected Friend Inform */}
                <div className="flex flex-col">
                    This is Info Part
                </div>
            </div>
            
            
            <div className="">

            </div>
            <div>
                <button onClick={onClickClose}>
                    Close
                </button>
            </div>
        </div>
    )
}