import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad : true,
    theme : 'dark',
    securityLevel : 'loose',
    
})

mermaid.registerIconPacks([
    {
        name : 'material',
        loader: ()=> import('@iconify-json/material-icon-theme').then((module)=> module.icons)
    },
    {
        name : 'icon',
        loader : ()=> import('@iconify-json/skill-icons').then((module)=> module.icons)
    }
])

const Mermaid = ({ chart }) => {
    const ref = useRef(null);

    useEffect(()=> {
        if(ref.current) {
            mermaid.contentLoaded();
        }
    },[chart]);

    return <div className='mermaid' ref={ref}>{chart}</div>
}

export default Mermaid;