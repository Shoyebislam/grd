import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CommentEntity } from './comment.entity';
import { CommentDto } from './comment.dto';
import { UserEntity } from 'src/user/user.entity';


@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRespository: Repository<UserEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRespository: Repository<CommentEntity>,
    ) {}
    getHello(): string {
        return 'Hello World!';
    }

    async createComment(data: CommentDto, userId: number): Promise<any> {
        const user = await this.userRespository.findOneBy({ id: userId }); // Ensure the user exists
        if (!user) {
            throw new NotFoundException({ message: 'User not found' });
        }

        const newComment = this.commentRespository.create({
            ...data,
            timeStamp: new Date().toISOString(),
            user,
        });
        return await this.commentRespository.save(newComment);
    }

    async getComments(userId: number): Promise<any> {
        const comments = await this.commentRespository.find({
            where: { user: { id: userId } }, // Filter comments by user ID
            relations: ['user'], // Load the related user
        });

        return comments;
    }

    async deleteComment(commentId: number): Promise<any> {
        const comment = await this.commentRespository.findOneBy({ commId: commentId });
        if (!comment) {
            throw new NotFoundException({ message: 'Comment not found' });
        }
        return await this.commentRespository.remove(comment);
    }
}

