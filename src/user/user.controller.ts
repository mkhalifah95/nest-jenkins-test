import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { GetUser } from "src/auth/decorators/getuser-decorator";
import { JwtGuard } from "src/auth/guard";

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    @Get('me')
    getMe(@GetUser() user: any) {
        return user
    } 
}