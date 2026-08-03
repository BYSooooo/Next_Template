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

    async getActiveBanners(): Promise<MainBanner[]> {
        const { data, error } = await this.supabaseService.client
            .from("main_bnanners")
            .select('id, title, description, footer, image_path, image_url, link_url, is_active, display_order')
            .eq('is_active', true)
            .order('display_order', { ascending : true});

        if(error) {
            throw new BadRequestException(error.message);
        }

        return data || [];
    }
}