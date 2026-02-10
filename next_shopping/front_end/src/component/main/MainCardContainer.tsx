"use client";

import React from 'react';
import { Button } from "@heroui/react";
import MainCard from "./MainCard";
import useEmblaCarousel from "embla-carousel-react";

export default function MainCardSlider() {

    const aCards = [
        { title : 'Spcecial Sales', footer : 'Get a Change!'},
        { title : 'Happy new Year!', footer : 'New year sales!', desc : 'up to 20% sale'},
        { title : 'Result of Event', footer : 'Check List', desc : ''},
        { title : 'Daily Event', footer : 'Up to 30% discount', desc : 'click More now'},
        { title : 'Last Chance!', footer : 'Sale for Season off Goods', desc: 'click More now!'}
    ]

    const aRepeatCard = [...aCards, ...aCards]

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align :"center", dragFree : false, containScroll : false, watchSlides : true })
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState([]);

    const scrollTo = React.useCallback((index: number)=> {
        if(emblaApi) emblaApi.scrollTo(index)
    },[emblaApi])

    const onSelectDot = React.useCallback(()=> {
        if(!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap())
    },[emblaApi])

    React.useEffect(()=> {
        if(!emblaApi) return;

        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelectDot)
        onSelectDot()
    },[emblaApi, onSelectDot])

    const onClickPrev = ()=> emblaApi?.scrollPrev();
    const onClickNext = ()=> emblaApi.scrollNext();
    

    return (
        <div className='relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'>

            <div className="embla" >
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        { aRepeatCard.map((card, index)=> {
                            return <MainCard key={index} title={card.title} footer={card.footer} desc={card?.desc} />
                        })}
                    </div>
                </div>
                <div className='embla__dots'>
                    {scrollSnaps.map((_, index)=> (
                        <button key={index}
                            className={`embla__dot ${index === selectedIndex ? 'active' : ''}`}
                            onClick={()=> scrollTo(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}