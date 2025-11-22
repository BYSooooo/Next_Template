import { extendTheme } from '@mui/material/styles';

const theme = extendTheme({
    colorSchemes : {
        light : {
            palette : {
                primary : {
                    main : '#1976d2'
                }
            }
        },
        dark : {
            palette : {
                primary : {
                    main : '#90caf9'
                }
            }
        }
    }
})

export default theme;