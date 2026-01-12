import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {  } from '@nestjs/config';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(SupabaseStrategy.name)

    constructor(private readonly configService : ConfigService) {
        
    }
}