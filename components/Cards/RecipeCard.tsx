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
import FavoriteButton from "../Common/FavoriteButton";

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
    <Link
      href={routes.recipes.details(recipe.id)}
      className="rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg flex flex-col h-[500px] w-full sm:w-auto bg-white"
    >
      <div className="flex flex-col h-full w-full overflow-hidden">
        <div className="relative basis-2/5">
          <Image
            src={recipe.image?.url ?? "/placeholder.jpg"}
            alt={recipe.title ? recipe.title : "Recipe Image"}
            fill
            className="object-cover rounded-t-lg"
          />
          {recipe.category?.name && (
            <div className="absolute top-2 right-2">
              <CustomChip bgColor={bgColors.secondary} text={recipe.category.name} />
            </div>
          )}
        </div>

        <div className="basis-3/5 p-4 flex flex-col justify-between space-y-2">
          <div>
            <h2 className={clsx(Typography.Title, "mb-1 line-clamp-2")}>
              {recipe.title}
            </h2>
            <p className={clsx(Typography.Caption, "line-clamp-3", "text-gray-700")}>
              {recipe.description}
            </p>
          </div>

          {Array.isArray(recipe.diets) && recipe.diets.length > 0 && (
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {recipe.diets.map((diet, index) => (
                <CustomChip key={index} text={diet.name} />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            <RatingDisplay rating={recipe.ratings_avg_rating ?? 0} />
            {!isAuthenticated ? (
              <div
                title="Você precisa estar autenticado para favoritar"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <FavoriteButton
                  isFavorite={isFavorite}
                  isToggling={isToggling}
                  onClick={handleFavoriteClick}
                />
              </div>
            ) : (
              <FavoriteButton
                isFavorite={isFavorite}
                isToggling={isToggling}
                onClick={handleFavoriteClick}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
