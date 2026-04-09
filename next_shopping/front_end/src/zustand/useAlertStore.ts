import { AlertDialogStatus } from "@heroui/react/dist/components/alert-dialog/alert-dialog";
import { create } from "zustand";

interface AlertState {
    openYn : boolean;
    status : AlertDialogStatus;
    title : string | null;
    description : string | null;
    customIcon? : React.ReactNode | null;

    openAlert : (
        status  : AlertDialogStatus, 
        title   : string,
        description : string,
        customIcon? : React.ReactNode) => void;
    closeAlert : ()=> void;
}

export const useAlertStore = create<AlertState>((set)=> ({
    openYn  : false,
    status  : "default",
    title       : "",
    description : "",
    customIcon : null,

    openAlert : (status,title,description,customIcon?)=> set({
        openYn : true,
        status, title, description, customIcon
    }),

    closeAlert : ()=> set({ 
        openYn : false, 
        status : "default", 
        title : null, 
        description : null, 
        customIcon : null
    })
}))
