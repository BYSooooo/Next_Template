import { AppBar, Toolbar } from "@mui/material";
import ThemeSwitcher from "./ThemeSwitcher";

export default function MainBar() {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <ThemeSwitcher />
            </Toolbar>
        </AppBar>
    )
}