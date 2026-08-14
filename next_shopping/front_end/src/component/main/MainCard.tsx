import { Button, Card } from "@heroui/react";
import Image from "next/image";

interface CardProp {
    title : string,
    footer? : string,
    desc? : string,
    image_url? : string,
    link_url? : string

}

export default function MainCard({title, footer, desc, image_url, link_url} : CardProp) {
    
    return (
        <Card className="max-w-80 min-h-100 bg-gray-100 shadow-accent-soft embla__slide overflow-hidden">
            { image_url && (
                <Image 
                    src={image_url}
                    fill
                    alt={title}
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority
                    className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover select-none opacity-70"
                />
            )}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
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
                    <Button variant="tertiary">
                        More
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    )
}