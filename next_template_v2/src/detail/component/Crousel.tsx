import { useTheme } from '@emotion/react';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';


export default function Carousel({data, width, height} : { data : any[], width : number, height : number}) {
    const theme = useTheme();
    const [ activeIndex, setActiveIndex] = React.useState(0);
    const totalSlides = data.length;

    const handleNext = React.useCallback(()=> {
        setActiveIndex((prev)=> (prev + 1) % totalSlides);
    },[totalSlides])

    const handlePrev = React.useCallback(()=> {
        setActiveIndex((prev)=> (prev - 1 + totalSlides) % totalSlides);
    },[totalSlides])

    return (
        <Box sx={{
            width : width,
            height : height,
            margin : 'auto',
            position : 'relative',
            overflow : 'hidden'}}>
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
                            alt={item.alt}
                            layout="fill"
                            objectFit="cover"
                            priority={index === activeIndex} 
                        />
                    </Box>
                ))}

            </Box>

            <IconButton 
                onClick={handlePrev} 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    direction : 'ltr',
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
                    direction : 'rtl',
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
                        }}
                    />
                ))}
            </Box>
        </Box>
    )
}

// --- 스타일 객체 (재사용 가능한 스타일) ---



const indicatorContainerStyle = (theme) => ({
    position: 'absolute',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: theme.spacing(1),
    zIndex: 10,
});

const indicatorDotStyle = (index, activeIndex, theme) => ({
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: index === activeIndex ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: '1px solid white',
});
