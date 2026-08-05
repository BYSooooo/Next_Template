"use client";

import React from 'react';
import MainCard from "./MainCard";
import useEmblaCarousel from "embla-carousel-react";
import { MainBannerItem } from '@/lib/api/main/banner';

interface MainCardSilderProps {
    initialBanners : MainBannerItem[];
}

export default function MainCardSlider({ initialBanners } : MainCardSilderProps) {
    const cards = initialBanners || [];

    const displayCards = cards.length > 0 && cards.length < 5
        ? [...cards, ...cards]
        : cards;

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

    if(cards.length === 0) {
        return null
    }
    
    const onClickPrev = ()=> emblaApi?.scrollPrev();
    const onClickNext = ()=> emblaApi.scrollNext();
    

    return (
        <div className='relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'>

            <div className="embla" >
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        { displayCards.map((card, index)=> (
                            <MainCard 
                                key={`${card.id}-${index}`}
                                title={card.title}
                                footer={card.footer}
                                desc={card.descriptin}
                            />
                            )
                        )}
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