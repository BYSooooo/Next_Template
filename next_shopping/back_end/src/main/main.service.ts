import { BadRequestException, Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabase/supabase.service";

export interface MainBanner {
    id : string;
    title : string;
    description : string;
    footer : string;
    image_path : string;
    image_url : string;
    link_url : string;
    is_active : boolean;
    display_order : number;
}

@Injectable()
export class MainService {
    constructor(private readonly supabaseService : SupabaseService) {};

    async getBannersByType(type : 'slider' | 'middle' = 'slider') : Promise<MainBanner[]> {
        const { data, error } = await this.supabaseService.client
            .from('main_banners')
            .select('id, title, description, footer, image_path, image_url, link_url, is_active, display_order, banner_type')
            .eq('is_active', true)
            .eq('banner_type', type)
            .order('display_order', {
                ascending : true
            })

            if(error) {
                throw new BadRequestException('Failed to get a banner data')
            }

            return data || [];
    }

    async getMainCurations() {
        const now = new Date().toISOString();

        const { data : sections, error} = await this.supabaseService.client
            .from('main_sections')
            .select('*')
            .eq('is_active', true)
            .lte('start_date',now)
            .or(`end_date.is.null,end_date.gte.${now}`)
            .order('display_order', { ascending : true})

        if (error || !sections) return [];

        const curatedList = await Promise.all(
            sections.map(async (section) => {
                const limitCount = section.display_limit || 8;

                const { data : sectionProducts } = await this.supabaseService.client
                    .from('main_section_products')
                    .select(`
                        display_order,
                        product: product_id (
                            id,
                            name,
                            subtitle,
                            price,
                            discount_rate,
                            status,
                            product_image (image_url, sort_order)
                        )
                        `)
                    .eq('section_id', section.id)
                    .order('display_order', { ascending : true})
                    .limit(limitCount);

                    const products = (sectionProducts || [])
                        .map((item : any) => item.product)
                        .filter((p: any) => p && p.status == 'ON_SALE')
                        .map((p : any)=> {
                            const discountRate = p.discount_rate || 0;
                            const discountedPrice = Math.floor(p.price * (1 - discountRate / 100));
                            const sortedImages = (p.product_image || []).sort(
                                (a : any, b : any) => (a.sort_order || 0 ) - (b.sort_order || 0)
                            );

                            return{
                                id : p.id,
                                name : p.name,
                                subtitle : p.subtitle,
                                price : p.price,
                                discount_rate : discountRate,
                                discounted_price : discountedPrice,
                                images : sortedImages.map((img : any)=> ({image_url :img.image_url }))
                            }
                        });
                    if(products.length === 0) return null;

                    return {
                        id : section.id,
                        title : section.title,
                        subtitle : section.subtitle,
                        banner_url : section.banner_url,
                        products
                    }

            })
        );

        return curatedList.filter(Boolean)
    };

    async getCurationDetail(id : string) {
        //...
    }
    
    
}