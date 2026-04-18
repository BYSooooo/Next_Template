
import { ToastContentValue, ToastProviderProps, ToastQueue, ToastVariants } from "@heroui/react";
import { create } from "zustand";

// Interface of Toast Content 
export interface ToastContentIF extends ToastContentValue {
    placement? : ToastProviderProps["placement"],
    title : string;
    description : string;
    variant? : ToastVariants["variant"];
    closeButtonYn? : boolean
    timeOut? : number;
}

// Set Type when create new Toast Queue
const globalToastQueue = new ToastQueue<ToastContentIF>();

// Interface of Manage Global Statement for Toast Component
interface ToastState {
    queue : ToastQueue<ToastContentIF>,
    placement? : ToastProviderProps["placement"],
    
    openToast : (options : ToastContentIF )=> void,
    closeToast: (key : string)=> void
}


export const useToastStore = create<ToastState>((set)=> ({
    queue : globalToastQueue,
    placement : "bottom",

    openToast : (options) => {
        // 1. Update Placement when create new Toast Object
        options.placement && set({  placement : options.placement })
        
        // 2. timeout value for control close Toast (Default 4000)
        const timeout = options.timeOut || 4000;

        // 2. Add Toast Object to Toast Que
        globalToastQueue.add({
            title : options.title,
            description : options.description,
            variant : options.variant,
            closeButtonYn : options.closeButtonYn || true,
            timeOut : timeout
        }, {
            timeout : timeout
        })
    },
    closeToast : (key)=> {
        globalToastQueue.close(key);
    }

}))