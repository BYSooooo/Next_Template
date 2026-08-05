export interface MainBannerItem {
    id              : string;
    title           : string;
    descriptin      : string;
    footer?         : string;
    image_url?      : string;
    image_path?     : string;
    link_url?       : string;
    is_active?      : boolean;
    display_order?  : number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getMainBanners(): Promise<MainBannerItem[]> {
    try {
        const res = await fetch(`${API_URL}/main/banners`, {
            next : { revalidate : 60 }
        });

        if(!res.ok) {
            return []
        }

        return await res.json();
    } catch(error) {
        return []
    }
}