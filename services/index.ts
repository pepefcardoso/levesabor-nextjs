import { RecipeCategory, RecipeDiet, RecipeUnit } from "@/typings/recipe";
import StandardService from "./standardService";
import { PostCategory, PostTopic } from "@/typings/post";
import { PostService } from "./postService";
import { RecipeService } from "./recipeService";
import { UserService } from "./userService";
import { NewsletterCustomerService } from "./NewsletterCustomerService";
import { ContactService } from "./contactService";
import { RatingsService } from "./ratingsService";

export const recipeService = new RecipeService();
export const recipeDietService = new StandardService<RecipeDiet>("/recipe-diets");
export const recipeCategoryService = new StandardService<RecipeCategory>("/recipe-categories");
export const recipeUnitService = new StandardService<RecipeUnit>("/recipe-units");

export const postService = new PostService();
export const postCategoryService = new StandardService<PostCategory>("/post-categories");
export const postTopicService = new StandardService<PostTopic>("/post-topics");

export const userService = new UserService();
export const newsletterService = new NewsletterCustomerService();
export const contactService = new ContactService();
export const commentsService = new StandardService<Comment>("/comments");
export const ratingsService = new RatingsService();
