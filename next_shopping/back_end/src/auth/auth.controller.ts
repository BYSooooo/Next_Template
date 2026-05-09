import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('signup')
    async signUp(@Body() signupData : any) {
        return await this.authService.register(signupData)
    }

    @Get('checkNick')
    async checkNick(@Body() nickname : string) {
        return await this.authService.checkNick(nickname);
    }

}