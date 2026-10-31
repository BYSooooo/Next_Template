export interface CuratedProduct {
    id: string;
    name: string;
    subtitle?: string;
    price: number;
    discount_rate: number;
    discounted_price: number;
    images: { image_url: string }[];
}

export interface CuratedSection {
    id: string;
    title: string;
    subtitle?: string;
    banner_url?: string;
    products: CuratedProduct[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getMainCurations() : Promise<CuratedSection[]> {
    try {
        const res = await fetch(`${API_URL}/main/curations`, {
            cache : 'no-cache'
        })
        if(!res.ok) return [];
        return await res.json()
    } catch (error) {
        console.error('Failed to fetch main curations:', error)
        return []
    }
}