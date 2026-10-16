export interface MainBannerItem {
    id              : string;
    title           : string;
    description     : string;
    footer?         : string;
    image_url?      : string;
    image_path?     : string;
    link_url?       : string;
    banner_type?    : 'slider'|'middle';
    display_order?  : number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getMainBanners(
    type : 'slider' | 'middle'
): Promise<MainBannerItem[]> {
    try {
        const res = await fetch(`${API_URL}/main/banners?type=${type}`, {
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