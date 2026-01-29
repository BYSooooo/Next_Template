import MainCard from "@/component/main/MainCard";
import { Button, ScrollShadow } from "@heroui/react";


export default function Page() {
    
    return (
        <div className="w-full overflow-scroll" >
            <ScrollShadow orientation="horizontal" className="flex w-full">
                <MainCard title="Card One"/>
                <MainCard title="Card Two" />
                <MainCard title="Card Three"/>
                <MainCard title="Card Four" />
            </ScrollShadow>

        </div>
    )
}