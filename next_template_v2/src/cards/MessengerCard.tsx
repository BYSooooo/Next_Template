'use client';

import { Card, CardActionArea, Divider, Stack, Typography } from "@mui/material";
import StackItem from "./component/StackItem";
import { useAppDispatch } from "../redux/hooks";
import { onOpenDetail } from "../redux/features/detailSlice";

const ICON_TAILWIND = "https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg";
const ICON_FIREBASE = "https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png";
const ICON_NEXTJS="https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67";
const ICON_TYPESCRIPT="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png";
const ICON_REDUX="https://redux-toolkit.js.org/img/redux.svg";

const MESSENGER_URL = 'https://next-messenger-6d354e8c1-bysooooos-projects.vercel.app'

export default function MessengerCard() {
    const dispatch = useAppDispatch()

    const onClickMessenger = ()=> {
        dispatch(onOpenDetail({ component : "Messenger", url : MESSENGER_URL}))
    }

    return (
        <CardActionArea
            onClick={onClickMessenger}>
            <Card sx={{ p: 2, borderRadius : 1}}>
                <Stack direction={'column'}>
                    <Typography 
                        variant="h5"
                        fontWeight='bold'>
                        Next Messenger
                    </Typography>
                    <Typography variant="subtitle2">
                        Chatting and Friend management
                    </Typography>
                    <Divider sx={{ py : 0.5}}/>
                    <Stack direction='column' rowGap={1}>
                        <Typography variant='h6'>
                            Stack
                        </Typography>
                        <StackItem iconPath={ICON_NEXTJS} name={"NextJS"}/>
                        <StackItem iconPath={ICON_REDUX} name={"Redux-Toolkit"}/>
                        <StackItem iconPath={ICON_FIREBASE} name={"Firebase"}/>
                        <StackItem iconPath={ICON_TYPESCRIPT} name={"Typescript"}/>
                        <StackItem iconPath={ICON_TAILWIND} name={"Tailwind CSS"} />
                    </Stack>
                </Stack>
            </Card>
        </CardActionArea>
    )
}