import { Button, Card } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface CardProp {
    id : string,
    promotion_id? :string;
    title : string,
    footer? : string,
    desc? : string,
    image_url? : string,
    link_url? : string

}

export default function MainCard({id, promotion_id, title, footer, desc, image_url, link_url} : CardProp) {
    const router = useRouter()
    const [imgError, setImgError] = React.useState(false);

    const onClickMore = ()=> {
        console.log(promotion_id)
        if(promotion_id && promotion_id.trim() !== "") {
            router.push(`/event/${promotion_id}`);
            return;
        }

        if(link_url && link_url.trim() !== "") {
            if (link_url.startsWith("http://") || link_url.startsWith("https://")) {
                window.open(link_url, "_blank");
                return;
            }

            router.push(link_url)
            return;
            
        } else {
            console.warn(id)
            router.push(`/event/${id}`)
        }
    };

    const hasValidImage = image_url && image_url.trim() !== "" && !imgError;

    
    return (
        <Card className="max-w-80 min-h-100 bg-gray-100 shadow-accent-soft embla__slide overflow-hidden">
            { hasValidImage && (
                <img 
                    src={image_url}
                    onError={()=> setImgError(true)}
                    className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover select-none opacity-70"
                />
            )}
            <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
            <Card.Title className="font-bold text-xl z-20">
                {title}
            </Card.Title>
            <Card.Footer className="z-20 mt-auto">
                <div className="w-full flex flex-row justify-between">
                    <div className="flex flex-col">
                        <div className="text-base font-bold text-white">
                            {footer ? footer : ''}
                        </div>
                        <div className="text-xs text-white">
                            {desc}
                        </div>
                    </div>
                    <Button
                        onClick={()=> onClickMore() } 
                        variant="tertiary">
                        More
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    )
}