import { CommentEntity } from "src/comment/comment.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    status: string;

    @Column()
    role: string;

    // One-to-Many Relationship with CommentEntity
    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];
}
