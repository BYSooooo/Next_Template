"use client"


import dynamic from "next/dynamic";

const NoSSRSearchMain = dynamic(()=> import("@/movie/layouts/SearchMain"), {ssr : false} );

export default function Search() {

    return <NoSSRSearchMain />
}