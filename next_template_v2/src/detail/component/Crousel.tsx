"use client";

import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';


export default function Carousel({data} : { data : any[] }) {
    const theme = useTheme();
    const screenSmYn = useMediaQuery(theme.breakpoints.down('sm'));

    const [ activeIndex, setActiveIndex] = React.useState(0);
    const [ aspectRatio, setAspectRatio] = React.useState(0);
    const totalSlides = data.length;

    const handleNext = React.useCallback(()=> {
        setActiveIndex((prev)=> (prev + 1) % totalSlides);
    },[totalSlides])

    const handlePrev = React.useCallback(()=> {
        setActiveIndex((prev)=> (prev - 1 + totalSlides) % totalSlides);
    },[totalSlides])

    const handleImageLoad = React.useCallback((imageInfo : { naturalWidth: number, naturalHeight: number }) => {
        if (imageInfo.naturalWidth > 0 && aspectRatio === 0) {
            const calculatedRatio = (imageInfo.naturalHeight / imageInfo.naturalWidth) * 100;
            if (calculatedRatio > 0) {
                setAspectRatio(calculatedRatio);
            }
        }
    }, [aspectRatio]);

    return (
        <Box sx={{
            width : screenSmYn ? '100%' : 300,
            height : screenSmYn ? 400 : 200,
            paddingTop : `${aspectRatio > 0 ? aspectRatio : 56.25 }`,
            margin : 'auto',
            position : 'relative',
            overflow : 'hidden',
            borderRadius : 1.5}}>
            <Box sx={{
                    position : 'absolute',
                    top : 0,
                    left : 0,
                    width : '100%',
                    height : '100%'
                }}>
                <Box sx={{
                    display: 'flex',
                    transform: `translateX(-${activeIndex * (100 / totalSlides)}%)`,
                    width: `${totalSlides * 100}%`, 
                    height: '100%',
                    transition: 'transform 0.5s ease-in-out' }}>
                    {data.map((item, index) => (
                        <Box
                            key={index}
                            sx={{   width: `${100 / totalSlides}%`, 
                                    flexShrink: 0, 
                                    position: 'relative' }}>
                            <Image
                                src={item}
                                alt={item.toString()}
                                layout="fill"
                                objectFit="cover"
                                priority={index === activeIndex} 
                                onLoadingComplete={index === 0 ? handleImageLoad : undefined}
                            />
                        </Box>
                    ))}

                </Box>
            </Box>

            <IconButton 
                onClick={handlePrev} 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left : 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                    zIndex: 10,
                    padding: 2  
                }}>
                <ArrowBackIosNew />
            </IconButton>
            
            <IconButton 
                onClick={handleNext} 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    right : 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                    zIndex: 10,
                    padding: 2  
                }}
            >
                <ArrowForwardIos />
            </IconButton>
            <Box sx={{
                position: 'absolute',
                bottom: 2,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1,
                zIndex: 10 }}>
                {data.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            border: '1px solid white',
                            backgroundColor: index === activeIndex ? 'white' : 'transparent',
                        }}
                    />
                ))}
            </Box>
        </Box>
    )
}
