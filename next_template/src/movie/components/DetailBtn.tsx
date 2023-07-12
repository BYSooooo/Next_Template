import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React from "react";

export default function DetailBtn() {
    const [anchorPop, setAnchorPop] = React.useState<HTMLButtonElement | null>(null);

    const onClick = (event : React.MouseEvent<HTMLButtonElement>) => {
        setAnchorPop(event.currentTarget);
    }

    const onClose = () => {
        setAnchorPop(null)
    }

    const open = Boolean(anchorPop);
    const id = open ? 'detailBtnPop' : undefined ;

    return (
        <div>
            <Button aria-describedby={id} sx={{ width: "100%", height : "100%" }} onClick={onClick}>
                <KeyboardArrowDown />
                <Typography>
                    Detail
                </Typography>
            </Button>
            <Popover id={id} open={open} anchorEl={anchorPop} onClose={onClose} anchorOrigin={{ vertical : "bottom", horizontal : "left"}} >
                <Typography>
                    Hello
                </Typography>
            </Popover>
        </div>
    )
}