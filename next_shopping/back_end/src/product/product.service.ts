import { Injectable, NotFoundException } from "@nestjs/common";
import { SupabaseService } from "src/supabase/supabase.service";

export interface CategoryNode {
    id : string;
    parent_id : string | null;
    name : string;
    depth : number;
    display_order : number;
    icon_url : string;
    children? : CategoryNode[]
}

export interface ProductImage {
    id : string;
    image_url : string;
    image_type : 'THUMBNAIL' | 'GALLERY' | 'DETAIL';
    sort_order : number;
}

export interface ProductOption {
    id : string;
    option_name : string;
    additional_price : number;
    stock_quantity : number;
}

export interface ProductDetailResponse {
    id : string;
    name : string;
    subtitle? : string;
    price : number;
    discount_rate : number;
    discounted_price : number;
    stock_quantity : number;
    origin? : string;
    delivery_type : 'DIRECT'|'PARCEL'|'EARLY_MORNING';
    is_alcohol : boolean;
    status : 'ON_SALE'|'SOLD_OUT'|'HIDDEN';
    created_at : string;
    // Category
    category_path :  CategoryNode[];
    images : ProductImage[];
    options : ProductOption[]
}

@Injectable()
export class ProductService {
    constructor(private readonly supabaseService : SupabaseService) {};

    async getCategoryTree() : Promise<CategoryNode[]> {
        const { data, error } = await this.supabaseService.client
            .from('categories')
            .select('*')
            .eq('is_active', true)
            .order('display_order', {
                ascending : true
            })
        
        if(error || !data) return [];

        const categoryMap = new Map<string, CategoryNode>();
        const rootCategories: CategoryNode[] =[];

        data.forEach((item)=> {
            const node = categoryMap.get(item.id);
            if(item.parent_id && categoryMap.has(item.parent_id)) {
                categoryMap.get(item.parent_id)!.children!.push(node!)
            } else {
                rootCategories.push(node!)
            }
        });
        return rootCategories;
    }

    async getProductDetail(productId : string): Promise<ProductDetailResponse> {
        const { data : product, error } = await this.supabaseService.client
            .from('products')
            .select('*')
            .eq('id', productId)
            .single()
        
        if(error || !product) {
            throw new NotFoundException('No Product');
        }

        const categoryPath = await this.buildCategoryPath(product.category_id); 

        const discountRate = product.discount_rate || 0;
        const discountedPrice = Math.floor(product.price * (1 - discountRate / 100));

        const sortedImages = (product.images || []).sort(
            (a: ProductImage, b : ProductImage) => (a.sort_order || 0) - (b.sort_order || 0)
        );

        return {
            id : product.id,
            name : product.name,
            subtitle : product.subtitle,
            price : product.price,
            discount_rate: discountRate,
            discounted_price: discountedPrice,
            stock_quantity: product.stock_quantity,
            origin: product.origin,
            delivery_type: product.delivery_type,
            is_alcohol: product.is_alcohol,
            status: product.status,
            created_at: product.created_at,
            category_path: categoryPath,
            images: sortedImages,
            options: product.options || []
        }
    }

    private async buildCategoryPath(categoryId? : string): Promise<CategoryNode[]> {
        if(!categoryId) return [];

        const path: CategoryNode[] = [];
        let currentId : string | null = categoryId;

        while(currentId) {
            const { data } : { data : CategoryNode | null } = await this.supabaseService.client
                .from('categories')
                .select('id, parent_id, name, depth, display_order, icon_url')
                .eq('id', currentId)
                .single();

            if(!data) break;

            path.unshift(data)
            currentId = data.parent_id
        };

        return path;
    } 
}
