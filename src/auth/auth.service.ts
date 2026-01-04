import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
 
@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {
        console.log('AuthService constructor');
    }

    async signup(dto: AuthDto) { 
        const hash = await argon.hash(dto.hash);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash,
                }
            });
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already exists');
                }
            }
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if (!user) {
            throw new UnauthorizedException('User does not exist');
        }
        console.log(user.hash);
        if (await argon.verify(user.hash, dto.hash)) {
            return this.signToken(user.id, user.email);
        } else {
            throw new UnauthorizedException('Invalid email or password');
        }
    }

    async signToken(userId: number, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email: email
        }

        const token = await this.jwt.signAsync(payload, {
            secret: this.config.get('JWT_SECRET'),
            expiresIn: '15m'
        });

        return {
            access_token: token
        };
    }
}