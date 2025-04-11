"use client";

import Image from "next/image";
import Link from "next/link";
import CustomChip from "../Others/CustomChip";
import { Typography } from "@/constants/typography";
import clsx from "clsx";
import routes from "../../routes/routes";
import { Recipe } from "@/typings/recipe";
import { recipeService } from "@/services/index";
import useAuthStore from "@/store/authStore";
import useFavorite from "../../hooks/useFavorite";
import { bgColors } from "@/constants/colors";
import RatingDisplay from "../Common/RatingDisplay";
import RecipeFavoriteButton from "../Common/RecipeFavoriteButton";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const toggleFavorite = async () => {
    return recipeService.toggleFavoriteRecipe(recipe.id);
  };

  const { isFavorite, isToggling, handleFavoriteClick } = useFavorite(
    toggleFavorite,
    recipe.is_favorited ?? false
  );

  return (
    <Link href={routes.recipes.details(recipe.id)} className="block">
      <div className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg h-[400px] w-full sm:w-auto bg-white flex flex-col">
        <div className="relative h-3/5 overflow-hidden">
          <Image
            src={recipe.image?.url ?? "/placeholder.jpg"}
            alt={recipe.title ? recipe.title : "Recipe Image"}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 left-2">
            <RecipeFavoriteButton
              isFavorite={isFavorite}
              isToggling={isToggling}
              onClick={handleFavoriteClick}
            />
          </div>
          {recipe.category?.name && (
            <div className="absolute top-2 right-2">
              <CustomChip bgColor={bgColors.secondary} text={recipe.category.name} />
            </div>
          )}
        </div>

        <div className="h-2/5 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <RatingDisplay rating={recipe.ratings_avg_rating} />
            <h2 className={clsx(Typography.Title, "line-clamp-2")}>
              {recipe.title}
            </h2>
          </div>
          {Array.isArray(recipe.diets) && recipe.diets.length > 0 && (
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {recipe.diets.map((diet, index) => (
                <CustomChip key={index} text={diet.name} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
