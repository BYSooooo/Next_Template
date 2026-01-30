"use client";

import { Button } from "@heroui/react";
import MainCard from "./MainCard";
import useEmblaCarousel from "embla-carousel-react";

export default function MainCardSlider() {

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align :"start", dragFree : true })

    const onClickPrev = ()=> emblaApi?.scrollPrev();
    const onClickNext = ()=> emblaApi.scrollNext();    

    return (
        <div className="embla" >
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    <MainCard title="Card One"/>
                    <MainCard title="Card Two" />
                    <MainCard title="Card Three"/>
                    <MainCard title="Card Four" />
                </div>
            </div>
            <div className="">
                <Button className="embla__prev" onClick={onClickPrev}>
                    Prev
                </Button>
                <Button className="embla__next" onClick={onClickNext}>
                    Next
                </Button>

            </div>
        </div>
    )
}