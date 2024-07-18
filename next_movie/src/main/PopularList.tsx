import React from 'react';

async function getPopular() {
    const response = await (await fetch('/api/movies/popular')).json()
    return response
}


export default async function PopularList() {
    const popularList = await getPopular();
    return (
        <div>
            {popularList}
        </div>
    )
}