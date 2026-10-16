import { Module } from "@nestjs/common";
import { SupabaseModule } from "src/supabase/supabase.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
    imports: [SupabaseModule],
    controllers : [ProductController],
    providers : [ProductService],
    exports : [ProductService]
})

export class ProductModule {}