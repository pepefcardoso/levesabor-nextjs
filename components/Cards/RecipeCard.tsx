"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomChip from "../Others/CustomChip";
import { Typography } from "@/constants/typography";
import clsx from "clsx";
import { bgColors, iconColors, txtColors } from "@/constants/colors";
import routes from "../../routes/routes";
import { FiStar, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { Recipe } from "@/typings/recipe";
import useAuthStore from "@/store/authStore";
import IconButton from "../Buttons/IconButton";
import { recipeService } from "@/services/index";
import toast from "react-hot-toast";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [isFavorite, setIsFavorite] = useState(recipe.is_favorited ?? false);
  const [isToggling, setIsToggling] = useState(false);
  const rating = recipe.ratings_avg_rating ?? 0;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleFavoriteClick = async (
    e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ): Promise<void> => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!isAuthenticated) return;

    setIsToggling(true);
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    const success = await recipeService.toggleFavoriteRecipe(recipe.id);

    if (success) {
      toast.success(
        newFavoriteStatus
          ? "Receita adicionada aos favoritos"
          : "Receita removida dos favoritos"
      );
    } else {
      toast.error("Erro ao atualizar favorito");
      setIsFavorite(!newFavoriteStatus);
    }

    setIsToggling(false);
  };

  const icon = isAuthenticated
    ? isFavorite
      ? FaHeart
      : FiHeart
    : FiHeart;

  const iconColor = isAuthenticated
    ? isFavorite
      ? iconColors.red
      : iconColors.gray
    : iconColors.grayLight;

  const favoriteButton = (
    <IconButton
      onClick={handleFavoriteClick}
      Icon={isToggling ? ImSpinner2 : icon}
      color={iconColor}
      size={24}
      className={isToggling ? "animate-spin" : ""}
      disabled={isToggling}
    />
  );

  return (
    <Link
      href={routes.recipes.details(recipe.id)}
      className="rounded-lg shadow-md cursor-pointer 
                 transition-transform duration-300 ease-in-out 
                 hover:scale-105 hover:shadow-lg flex flex-col h-[500px] w-full sm:w-auto bg-white"
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
            <h2 className={clsx(Typography.Title, "mb-1 line-clamp-2")}>{recipe.title}</h2>
            <p className={clsx(Typography.Caption, txtColors.gray700, "line-clamp-3")}>
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
            <div className="flex items-center space-x-1">
              <FiStar className="w-5 h-5" color={rating > 0 ? "#FBBF24" : "#9CA3AF"} />
              <span className="text-sm font-medium">
                {rating > 0 ? rating.toFixed(1) : "-"}
              </span>
            </div>

            {!isAuthenticated ? (
              <div
                title="Você precisa estar autenticado para favoritar"
                className="inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {favoriteButton}
              </div>
            ) : (
              favoriteButton
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
