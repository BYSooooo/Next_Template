interface ProductItem {
    id: string;
    name: string;
    subtitle?: string;
    price: number;
    discount_rate: number;
    discounted_price: number;
    images: { image_url: string }[];
}

interface CurationProductGridProps {
    products: ProductItem[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getCurationDetail(id : string) {
    try {
        const response = await fetch(`${API_URL}/main/curations/${id}`, {
            cache : 'no-store',
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        if(!response.ok) {
            throw new Error(`Fail to fetch event : ${response.statusText}`)
        }

        return await response.json();

    } catch (error) {
        console.error(`Erro : `,error);
        return null
    } 
}
