import { MorphableTypeEnum } from "./enums";

export interface Rating {
  id?: string;
  user_id?: string;
  rating: number;
  rateable_id: string;
  rateable_type: MorphableTypeEnum;
}
