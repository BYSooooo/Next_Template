import { createTheme, responsiveFontSizes } from "@mui/material"
import { useMemo } from "react"

const ThemeRegister = (props : any) => {

    const theme = useMemo(()=> {
        return responsiveFontSizes(createTheme({
            cssVariables : {
                colorSchemeSelector : 'class',
                disableCssColorScheme : true
            },
            
        }))
    })
}