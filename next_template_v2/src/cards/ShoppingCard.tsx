'use client';

import { Card, CardActionArea, Divider, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { onOpenDetail } from "../redux/features/detailSlice";
import StackItem from "./component/StackItem";
import { Warning } from "@mui/icons-material";

const ICON_NEXTJS="https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67";

export default function ShoppingCard() {
    const dispatch = useAppDispatch()

    const onClickShopping = ()=> {
        dispatch(onOpenDetail({ component : "Shopping", url : "none"}))
    }

    return (
        <CardActionArea
            onClick={onClickShopping}>
            <Card sx={{ p: 2, borderRadius : 1}}>
                <Stack direction={'row'} rowGap={1} columnGap={1} alignItems={'center'}>
                    <Warning sx={{ color : 'gray'}}/>
                    <Typography 
                        variant="h5"
                        fontWeight='bold'>
                        Next Shopping
                    </Typography>
                </Stack>
                <Typography variant="subtitle2">
                    Basic Shopping Site
                </Typography>
                <Divider sx={{ py : 0.5}}/>
                <Stack direction={'column'} rowGap={1}>
                    <Typography variant='h6'>
                        Stack
                    </Typography>
                    <StackItem iconPath={ICON_NEXTJS} name="NextJS" />
                </Stack>
            </Card>
        </CardActionArea>
    )
}