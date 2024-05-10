import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { editUserDTO } from './DTO/editUserDTO';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }


    async editUser(id: number, body: editUserDTO) {
        const user = await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...body
            }
        });

        delete user.password;
        return user;
    }
}
