import { create } from "zustand";
import { ReactNode } from "react";


interface ModalState {
    isOpen : boolean;
    content : ReactNode;
    size : any;
    openModal : (content: ReactNode, size : string ) => void;
    closeModal : () => void;
}


export const useModalStore = create<ModalState>((set)=> ({
    isOpen : false,
    content : null,
    size : "md",
    openModal : (content, size) => set({ isOpen : true, content, size}),
    closeModal : ()=> set({ isOpen : false, content : null, size : "md"})
}))