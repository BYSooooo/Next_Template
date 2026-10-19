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
        const { data: promo } = await this.supabaseService.client
        .from('promotions')
        .select('*')
        .eq('id', promoId)
        .eq('is_active', true)
        .lte('start_date', new Date().toISOString())
        .or(`end_date.is.null,end_date.gte.${new Date().toISOString()}`)
        .maybeSingle();

        const { data: promoProducts } = await this.supabaseService.client
            .from('promotion_products')
            .select(`
                display_order,
                product:product_id (
                    id, name, subtitle, price, discount_rate, status,
                    product_image (id, image_url, sort_order)
                )
            `)
            .eq('promotion_id', promoId)
            .order('display_order', { ascending: true });
    }

    async getEventDetail(eventId : string) : Promise<EventDetailResponse> {



        // 1. Get a Event Detail
        const { data : event, error : eventError } = await this.supabaseService.client
            .from('event')
            .select('*')
            .eq('id', eventId)
            .eq('is_active', true)
            .maybeSingle();

        
        if(eventError) {
            console.error('Database Error : ', eventError);
            throw new NotFoundException(`Database Error : ${eventError.message}`)
        }

        if(!event){
            throw new NotFoundException('Event not found or inactive');
        };

        // 2. get a Product List in this Event (JOIN product & product_image)
        const { data : eventProducts, error : productError } = await this.supabaseService.client
            .from('event_product')
            .select(`
                product:product_id (
                    id,
                    name,
                    subtitle,
                    price,
                    discount_rate,
                    status,
                    created_at,
                    product_image (
                        id, image_url, sort_order
                    )
                )
            `)
            .eq('event_id', eventId);
        
        if(productError) {
            console.error('Product Fetch Error : ', productError);
        }

        //3. Manage Product data and calculate discount Rate
        const products : EventProductItem[] = (eventProducts || [])
            .map((item : any) => item.product)
            .filter((p : any) => p && p.status === 'ON_SALE')
            .map((p : any) => {
                const discountRate = p.discount_rate || 0;
                const discountedPrice = Math.floor(p.price * (1 - discountRate / 100))

                const rawImages = p.product_image || [];
                const sortedImages = rawImages.sort(
                    (a : any, b : any) => (a.sort_order || 0 ) - (b.sort_order || 0)
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
            id : event.id,
            title : event.title,
            description : event.description,
            banner_url : event.banner_url,
            start_date : event.start_date,
            end_date : event.end_date,
            is_active : event.is_active,
            products
        }
    }
}