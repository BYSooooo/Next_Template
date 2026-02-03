import { Card } from "@heroui/react";

export default function MainCard({title} :{title : string}) {
    

    return (
        <Card className="max-w-80 min-h-100 bg-gray-100 shadow-accent-soft embla__slide">
            <Card.Title className="font-bold text-xl">
                {title}
            </Card.Title>
            <Card.Footer className="z-10 mt-auto">
                <div>
                    <div className="text-base font-bold">
                        This is Card Footer
                    </div>
                    <div className="text-xs">
                        Buy Now!
                    </div>

                </div>
            </Card.Footer>
        </Card>
    )
}