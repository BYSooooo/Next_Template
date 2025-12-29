import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad : true,
    theme : 'dark',
    securityLevel : 'loose',
    
})

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