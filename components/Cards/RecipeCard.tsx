"use client";

import Link from "next/link";
import React from "react";
import { Recipe } from "../../typings/recipe";
import routes from "../../routes/routes";
import CustomChip from "../Others/CustomChip";
import CustomImage from "../Others/CustomImage";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link href={routes.recipes.details(recipe.id)} className="block">
      <div className="rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-[420px] sm:h-[400px] w-full sm:w-auto">
        <div className="relative">
          <CustomImage
            src={recipe.image?.url ?? "/placeholder.jpg"}
            alt={recipe.title}
            width="100%"
            height="100%"
            rounded="lg"
            objectFit="cover"
          />
          {recipe.category?.name && (
            <div className="absolute top-2 right-2">
              <CustomChip color="blue" fontColor="white" text={recipe.category.name} />
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-lg sm:text-xl font-bold mb-1 line-clamp-2">
            {recipe.title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base line-clamp-4 flex-grow">
            {recipe.description}
          </p>

          {Array.isArray(recipe.diets) && recipe.diets.length > 0 && (
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {recipe.diets.map((diet, index) => (
                <CustomChip key={index} color="green" fontColor="white" text={diet.name} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
