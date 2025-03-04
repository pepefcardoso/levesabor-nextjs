"use client";
import Link from "next/link";
import React from "react";
import { Recipe } from "../../typings/recipe";
import routes from "../../routes/routes";
import CustomChip from "../Others/CustomChip";
import CustomImage from "../Others/CustomImage";
import { Typography } from "../../constants/typography";
import { bgColors, txtColors } from "../../constants/colors";

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
          <CustomImage
            src={recipe.image?.url ?? "/placeholder.jpg"}
            alt={recipe.title}
            width="100%"
            height="100%"
            objectFit="cover"
            className="rounded-t-lg"
          />
          {recipe.category?.name && (
            <div className="absolute top-2 right-2">
              <CustomChip bgColor={bgColors.secondary} fontColor={txtColors.black} text={recipe.category.name} />
            </div>
          )}
        </div>

        <div className="flex-grow basis-3/5 p-4 flex flex-col justify-between">
          <div>
            <h2 className={`${Typography.h4} mb-1 line-clamp-2`} style={{ color: txtColors.gray800 }}>
              {recipe.title}
            </h2>
            <p className={`${Typography.body} line-clamp-3`} style={{ color: txtColors.gray200 }}>
              {recipe.description}
            </p>
          </div>

          {Array.isArray(recipe.diets) && recipe.diets.length > 0 && (
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {recipe.diets.map((diet, index) => (
                <CustomChip key={index} bgColor={bgColors.tertiary} fontColor={txtColors.black} text={diet.name} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
