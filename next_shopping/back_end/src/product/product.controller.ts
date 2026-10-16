import { Controller, Get, Param, Query } from "@nestjs/common";
import { CategoryNode, ProductDetailResponse, ProductService } from "./product.service";

@Controller('product')
export class ProductController {
    constructor(private readonly productService : ProductService) {}

    // GET /product/categories
    @Get('categories')
    async getCategories(): Promise<CategoryNode[]> {
        return await this.productService.getCategoryTree();
    }

    @Get('search')
    async searchProducts(
        @Query('q') query: string,
        @Query('sort') sort? : string
    ) : Promise<ProductDetailResponse[]> {
        return await this.productService.searchProducts(query,sort);
    }


    // GET /product/:id
    @Get(':id')
    async getProductDetail(@Param('id') id: string) : Promise<ProductDetailResponse> {
        return await this.productService.getProductDetail(id);
    }

}