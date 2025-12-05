import { AppBar, Toolbar, Link } from "@mui/material";
import ThemeSwitcher from "./ThemeSwitcher";
import { GitHub } from "@mui/icons-material";

export default function MainBar() {
    

    return (
        <AppBar position="sticky">
            <Toolbar sx={{ justifyContent : 'space-between'}}>
                    <Link 
                        target='_blank'
                        rel='noopener'
                        href='https://github.com/BYSooooo/Next_Template'>
                        <GitHub sx={{ color : 'ghostwhite'}} fontSize="large"/>
                    </Link>
                <ThemeSwitcher />
            </Toolbar>
        </AppBar>
    )
}