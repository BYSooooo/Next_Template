"use client"

import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useAppSelector } from "../redux/hooks"

export default function ModeIcon() {
    const modeReducer = useAppSelector((state)=> state.themeReducer);
    return modeReducer.theme ? <DarkModeOutlined /> : <LightModeOutlined /> 
    
}