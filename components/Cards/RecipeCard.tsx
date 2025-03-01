"use client";
import Link from "next/link";
import React from "react";
import { Recipe } from "../../typings/recipe";
import routes from "../../routes/routes";
import CustomChip from "../Others/CustomChip";
import CustomImage from "../Others/CustomImage";
import { Typography } from "../../constants/typography";
import colors from "../../constants/colors";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link href={routes.recipes.details(recipe.id)} className="block">
      <div className="flex flex-col h-[500px] w-full sm:w-auto rounded-lg shadow-lg bg-white cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
        {/* Top Section: Image */}
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
              <CustomChip color={colors.erinGreen} fontColor="white" text={recipe.category.name} />
            </div>
          )}
        </div>

        {/* Bottom Section: Title, Description & Diets */}
        <div className="flex-grow basis-3/5 p-4 flex flex-col justify-between">
          <div>
            <h2 className={`${Typography.h4} mb-1 line-clamp-2`} style={{ color: "black" }}>
              {recipe.title}
            </h2>
            <p className={`${Typography.body} line-clamp-3`} style={{ color: colors.gray.regular }}>
              {recipe.description}
            </p>
          </div>
          {Array.isArray(recipe.diets) && recipe.diets.length > 0 && (
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {recipe.diets.map((diet, index) => (
                <CustomChip key={index} color={colors.pineappleYellow} fontColor="white" text={diet.name} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
