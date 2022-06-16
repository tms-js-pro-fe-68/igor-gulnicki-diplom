import { createTheme } from "@mui/material";


export default createTheme({
    palette: {
        ondark: {
            main: '#FFFF'
        },
        primary:{
            main: '#666666',
        },
    },
    components: {
        MuiOutlinedInput: {
            defaultProps: {
                color: "ondark"
            },
            styleOverrides: {
                input: {
                    color: 'white'
                },
                label: {
                    color: 'white'

                },
                notchedOutline: {
                    color: 'white',
                    borderColor: 'white',

                }
            },
        }
    }
});