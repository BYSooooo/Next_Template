import { ConfigService } from '@nestjs/config';
declare const SupabaseStrategy_base: new (...args: any) => any;
export declare class SupabaseStrategy extends SupabaseStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<any>;
    authenticate(req: any): void;
}
export {};
