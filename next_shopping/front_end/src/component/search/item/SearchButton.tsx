"use client";

import { Alert, Button } from "@heroui/react";

export default function SearchButton() {
    const onClickSearch = ()=> {
        alert("Hello")
    }

    return (
        <Button 
            onPress={onClickSearch}
            size="lg" className="bg-black hover:bg-gray-800">
            Search
        </Button>
    )
}