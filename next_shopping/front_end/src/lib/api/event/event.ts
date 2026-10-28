export interface Product {
    id : string;
    name : string;
    subtitle? : string;
    price : number;
    discount_rate : number;
    discounted_price : number;
    status : 'ON_SALE' | 'SOLD_OUT' | 'HIDDEN';
    images : { image_url : string }[];
}

export interface EventDetail {
    id : string;
    title : string;
    subtitle : string;
    description : string;
    content_html?: string;
    banner_url : string;
    start_date : string;
    end_date : string;
    is_active : boolean;
    products : Product[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getEventDetail(eventId : string) {
    try {
        const res = await fetch(`${API_URL}/event/${eventId}`, {
            cache : 'no-store'
        })

        // Case 1. Not Found
        if(res.status === 404) {
            return null;
        }
        // Case 2. Error
        if(!res.ok) {
            throw new Error(`Failed to fetch event : ${res.statusText}`); 
        }
        
        const data = await res.json();
        return data as EventDetail;

    } catch (error) {
        console.error(error)
        return null
    }
}