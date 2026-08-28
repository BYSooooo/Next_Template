export interface CategoryNode {
    id : string;
    name : string;
}

export interface ProductImage {
    id : string;
    image_url : string;
    image_type : 'THUMBNAIL' | 'GALLERY' | 'DETAIL'
    sort_order : number;
}

export interface ProductOption {
    id : string;
    option_name : string;
    additional_price : number;
    stock_quantity : number
}

export interface ProductDetailResponse {
    id: string;
    name: string;
    subtitle?: string;
    price: number;
    discount_rate: number;
    discounted_price: number;
    stock_quantity: number;
    origin?: string;
    delivery_type: 'DIRECT' | 'PARCEL' | 'EARLY_MORNING';
    is_alcohol: boolean;
    status: 'ON_SALE' | 'SOLD_OUT' | 'HIDDEN';
    category_path: CategoryNode[];
    images: ProductImage[];
    options: ProductOption[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getProductDetail(productId : string) : Promise<ProductDetailResponse | null> {
    try {
        const res = await fetch(`${API_URL}/product/${productId}`, {
            next : { revalidate : 60 }
        });

        if(!res.ok) { return null };
        return await res.json();

    } catch (error) {
        return null;
    }
}