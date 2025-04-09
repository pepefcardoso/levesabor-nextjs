import { MorphableTypeEnum } from "./enums";
import { User } from "./user";

export interface Comment {
    id: string;
    content: string;
    user_id: string;
    commentable_id: string;
    commentable_type: MorphableTypeEnum;
    created_at: string;
    updated_at: string;
    user: User;
}
