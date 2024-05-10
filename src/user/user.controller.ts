import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/authDecorator';
import { editUserDTO } from './DTO/editUserDTO';
import { UserService } from './user.service';
import { jwtGuard } from 'src/auth/guard/authGuard';
import { User } from '@prisma/client';
import { Request } from 'express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(jwtGuard)
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {

    }


    @Get('/me')
    getMe(@GetUser() user: number) {
        return user
    }

    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiBody({
        type: editUserDTO,
        description: 'Json structure for user object',
    })
    @Patch('/edit')
    editUser(@GetUser('id') userId: number, @Body() body: editUserDTO) {
        return this.userService.editUser(userId, body);
    }
}
