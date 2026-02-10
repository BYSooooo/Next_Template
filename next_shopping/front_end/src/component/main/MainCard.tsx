import { Button, Card } from "@heroui/react";

interface CardProp {
    title : string,
    footer? : string,
    desc? : string
}

export default function MainCard({title, footer, desc} : CardProp) {
    

    return (
        <Card className="max-w-80 min-h-100 bg-gray-100 shadow-accent-soft embla__slide">
            <Card.Title className="font-bold text-xl">
                {title}
            </Card.Title>
            <Card.Footer className="z-10 mt-auto">
                <div className="w-full flex flex-row justify-between">
                    <div className="flex flex-col">
                        <div className="text-base font-bold ">
                            {footer ? footer : ''}
                        </div>
                        <div className="text-xs">
                            {desc}
                        </div>
                    </div>
                    <Button variant="outline">
                        More
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    )
}