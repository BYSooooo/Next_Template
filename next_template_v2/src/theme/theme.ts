'use client';

import { extendTheme } from '@mui/material/styles'

const theme = extendTheme({
    colorSchemes : {
        light : true, dark : true
    },
    colorSchemeSelector : 'class'
})

export default theme;