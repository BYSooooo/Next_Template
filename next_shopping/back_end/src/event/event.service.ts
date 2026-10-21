import { Injectable, NotFoundException } from "@nestjs/common";
import { SupabaseService } from "src/supabase/supabase.service";

export interface EventProductItem {
    id : string;
    name : string;
    subtitle? : string;
    price : number;
    discount_rate : number;
    discounted_price : number;
    status : 'ON_SALE' | 'SOLD_OUT' | 'HIDDEN';
    images : { image_url : string}[];
}

export interface EventDetailResponse {
    id : string;
    title : string;
    description : string;
    banner_url? : string;
    start_date : string;
    end_date : string;
    is_active : boolean;
    products : EventProductItem[]
}

@Injectable()
export class EventService {
    constructor (private readonly supabaseService : SupabaseService) {}

    async getPromoDetail (promoId : string) {
        const { data: promo, error : promoError } = await this.supabaseService.client
        .from('promotions')
        .select('*')
        .eq('id', promoId)
        .eq('is_active', true)
        .lte('start_date', new Date().toISOString())
        .or(`end_date.is.null,end_date.gte.${new Date().toISOString()}`)
        .maybeSingle();

        if(promoError) {
            console.error('Database Error:', promoError);
            throw new NotFoundException(`Database Error : ${promoError}`);
        }

        if(!promo) {
            throw new NotFoundException('Promotion not found, inactive, or expired.');
        }

        const { data: promoProducts, error: productError } = await this.supabaseService.client
            .from('promotion_products')
            .select(`
                display_order,
                product:product_id (
                    id,
                    name,
                    subtitle,
                    price,
                    discount_rate,
                    status,
                    created_at,
                    product_image (
                        id,
                        image_url,
                        sort_order
                    )
                )
            `)
            .eq('promotion_id', promoId)
            .order('display_order', { ascending: true });
        
        if(productError) {
            console.error('Product Fetch Error : ', productError);
        }

        const products: EventProductItem[] = (promoProducts || [])
            .map((item:any) => item.product)
            .filter((p : any) => p && p.status === 'ON_SALE')
            .map((p: any) => {
                const discountRate = p.discount_rate || 0;
                const discountedPrice = Math.floor(p.price * (1 - discountRate / 100));

                const rawImages = p.product_image || [];
                const sortedImages = rawImages.sort(
                    (a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)
                );

                return {
                    id: p.id,
                    name: p.name,
                    subtitle: p.subtitle,
                    price: p.price,
                    discount_rate: discountRate,
                    discounted_price: discountedPrice,
                    status: p.status,
                    images: sortedImages.map((img: any) => ({ image_url: img.image_url })),
                }
            });

        return {
            id: promo.id,
            title: promo.title,
            subtitle: promo.subtitle,
            description: promo.description,
            banner_url: promo.detail_banner_url || promo.image_url, // 상세 전용 배너가 없으면 일반 이미지 활용
            start_date: promo.start_date,
            end_date: promo.end_date,
            is_active: promo.is_active,
            products,
        }
    }
}