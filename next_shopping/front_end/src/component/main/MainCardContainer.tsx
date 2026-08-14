"use client";

import React from 'react';
import MainCard from "./MainCard";
import useEmblaCarousel from "embla-carousel-react";
import { MainBannerItem } from '@/lib/api/main/banner';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@heroui/react';

interface MainCardSilderProps {
    initialBanners : MainBannerItem[];
}

const ChevronLeftIcon = () => (
    <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
);

export default function MainCardSlider({ initialBanners } : MainCardSilderProps) {
    const cards = initialBanners || [];

    const displayCards = cards.length > 0 && cards.length < 5
        ? [...cards, ...cards]
        : cards;

    const autoplay = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true, 
        align :"center", 
        dragFree : false, 
        containScroll : false, 
        watchSlides : true },
        [autoplay.current]
    )
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState([]);

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev();
            autoplay.current.reset(); // 버튼 클릭 시 15초 타이머 리셋
        }
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext();
            autoplay.current.reset(); // 버튼 클릭 시 15초 타이머 리셋
        }
    }, [emblaApi]);

    const scrollTo = React.useCallback((index: number)=> {
        if(emblaApi){
            emblaApi.scrollTo(index)
            autoplay.current.reset();
        } 
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
    

    return (
        <div className='relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'>
            <div className="embla relative max-w-7xl mx-auto px-4" >
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        { displayCards.map((card, index)=> (
                            <MainCard 
                                key={`${card.id}-${index}`}
                                title={card.title}
                                footer={card.footer}
                                desc={card.description}
                                image_url={card.image_url}
                            />
                            )
                        )}
                    </div>
                </div>
                <Button
                    isIconOnly
                    aria-label="Previous Slide"
                    className="absolute left-5 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-white text-gray-800 shadow-md backdrop-blur-md transition-opacity duration-300 opacity-80 group-hover:opacity-100"
                    onClick={scrollPrev}
                >
                    <ChevronLeftIcon />
                </Button>

                <Button
                    isIconOnly
                    aria-label="Next Slide"
                    className="absolute right-5 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-white text-gray-800 shadow-md backdrop-blur-md transition-opacity duration-300 opacity-80 group-hover:opacity-100"
                    onClick={scrollNext}
                >
                    <ChevronRightIcon />
                </Button>
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