"use client";

import { Recipe } from "@/typings/recipe";
import Image from "next/image";
import Link from "next/link";
import routes from "routes/routes";
import CustomChip from "../Others/CustomChip";
import { Typography } from "@/constants/typography";
import clsx from "clsx";
import { bgColors, txtColors } from "@/constants/colors";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link
      href={routes.recipes.details(recipe.id)}
      className="rounded-lg shadow-md cursor-pointer 
                   transition-transform duration-300 ease-in-out 
                   hover:scale-105 hover:shadow-lg flex flex-col h-[420px] w-full sm:w-auto bg-white"
    >
      <div className="flex flex-col h-[500px] w-full sm:w-auto rounded-lg shadow-lg bg-white cursor-pointer overflow-hidden">
        <div className="flex-none basis-2/5 relative">
          <div className="relative w-full h-full rounded-t-lg overflow-hidden">
            <Image
              src={recipe.image?.url ?? "/placeholder.jpg"}
              alt={recipe.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          {recipe.category?.name && (
            <div className="absolute top-2 right-2">
              <CustomChip bgColor={bgColors.secondary} text={recipe.category.name} />
            </div>
          )}
        </div>

        <div className="flex-grow basis-3/5 p-4 flex flex-col justify-between">
          <div>
            <h2 className={clsx(Typography.Title, "mb-1 line-clamp-2")}>{recipe.title}</h2>
            <p className={clsx(Typography.Caption, txtColors.gray800, "line-clamp-3")}>{recipe.description}</p>
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
