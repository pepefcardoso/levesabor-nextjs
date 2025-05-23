import { MorphableTypeEnum } from "./enums";
import { User } from "./user";

export interface Comment {
    id?: string;
    content: string;
    commentable_id: string;
    commentable_type: MorphableTypeEnum;
    created_at?: string;
    updated_at?: string;
    user_id?: string;
    user?: User;
}
