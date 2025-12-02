import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useDetailStore = create(
    persist((set,get)=> ({
        openYn : false,

    }), {
        name : 'detailStore'
    })
)