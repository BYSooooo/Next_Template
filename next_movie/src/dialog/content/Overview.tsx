import { Button, DialogActions, DialogTitle } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { controlDialog } from "../../redux/features";

export default function Overview() {
    const dispatch = useAppDispatch()
    const onClickClose =()=> {
        dispatch(controlDialog({ openYn : false, name : ""}))
    };

    return (
        <>
            <DialogTitle>
                This is Overview
            </DialogTitle>
            <DialogActions>
                <Button >More</Button>
                <Button onClick={()=>onClickClose()}>Close</Button>
            </DialogActions>
        </>
    )
}