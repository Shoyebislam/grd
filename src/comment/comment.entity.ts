import { UserEntity } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
@Entity("comment")
export class CommentEntity {
    @PrimaryGeneratedColumn()
    commId: number;

    @Column()
    content: string;

    @Column()
    postId: number;

    @Column()
    timeStamp: string;

    @Column()
    upvote: number;

    // Many-to-One Relationship with UserEntity
    @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: "CASCADE" }) // UserEntity is referenced here
    user: UserEntity;
}
