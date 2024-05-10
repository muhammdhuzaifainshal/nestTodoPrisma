import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class authStrategy extends PassportStrategy(Strategy){
    
    constructor(config:ConfigService,private prisma:PrismaService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload : {id:number,email:string}){
        const user = await this.prisma.user.findFirst({
            where:{
                id:payload.id,
            }
        })
        
        delete user.password
        return user;
        
    }


}