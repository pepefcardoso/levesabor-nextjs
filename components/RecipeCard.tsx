import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Recipe } from "../typings/api";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-[400px] w-full sm:w-auto">
        <div className="relative">
          <Image
            src={recipe.image?.url ?? "/placeholder.jpg"}
            alt={recipe.title}
            width={300}
            height={200}
            className="w-full h-48 sm:h-40 object-cover"
          />
          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            {recipe.category?.name}
          </span>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-lg sm:text-xl font-bold mb-1">{recipe.title}</h2>
          <p className="text-gray-600 flex-grow text-sm sm:text-base break-words overflow-hidden overflow-ellipsis">
            {recipe.description}
          </p>
          <div className="mt-2 flex space-x-2 overflow-x-auto pb-2">
            {recipe.diets?.map((diet, index) => (
              <span
                key={index}
                className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded whitespace-nowrap"
              >
                {diet.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
