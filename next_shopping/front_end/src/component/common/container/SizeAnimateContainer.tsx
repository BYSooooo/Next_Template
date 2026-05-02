"use client";

import React from 'react';
import { motion } from 'motion/react';

interface Props {
    children : React.ReactNode;
    className? : string;
}

export default function SizeAnimateContainer({children, className} : Props) {

    return (
        <motion.div
            layout
            transition={{
                layout : { duration : 0.4, ease : [0.4, 0, 0.2, 1]}
            }}
            className={`overflow-hidden ${className}`}>
            {children}
        </motion.div>
    )
}