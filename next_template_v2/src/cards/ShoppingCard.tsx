'use client';

import { Card, CardActionArea, Divider, Typography } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { onOpenDetail } from "../redux/features/detailSlice";

export default function ShoppingCard() {
    const dispatch = useAppDispatch()

    const onClickShopping = ()=> {
        dispatch(onOpenDetail({ component : "Shopping", url : ""}))
    }

    return (
        <CardActionArea
            onClick={onClickShopping}>
            <Card sx={{ p: 2, borderRadius : 1}}>
                <Typography 
                    variant="h5"
                    fontWeight='bold'>
                    Next Shopping - Plan
                </Typography>
                <Divider sx={{ py : 0.5}}/>
                <Typography variant='h6'>
                    Stack
                </Typography>
            </Card>
        </CardActionArea>
    )
}