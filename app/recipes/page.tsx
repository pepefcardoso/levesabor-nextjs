"use client";

import React from "react";
import RecipeCard from "../../components/RecipeCard";
import RecipeCategoryCard from "../../components/RecipeCategoryCard";
import RecipeDietCard from "../../components/RecipeDietCard";
import {
  DUMMY_RECIPE_CATEGORIES,
  DUMMY_RECIPE_DIETS,
  DUMMY_RECIPES,
} from "../../Constants";

const Page = () => {
  return (
    <div className="container mx-auto px-6 py-10 max-w-6xl w-full">
      {/* Title for Recipes */}
      <h1 className="text-3xl sm:text-4xl font-bold text-left mb-8">
        Nossas principais escolhas
      </h1>

      {/* Recipe Cards Grid (first 4 recipes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {DUMMY_RECIPES.slice(0, 4).map((recipe, index) => (
          <RecipeCard
            key={index}
            id={recipe.id.toString()}
            title={recipe.title}
            description={recipe.description}
            imageSrc={recipe.imageSrc}
            diets={recipe.diets}
            category={recipe.category}
          />
        ))}
      </div>

      {/* Title for Categories */}
      <h2 className="text-2xl sm:text-3xl font-bold text-left mb-8">
        Por categorias
      </h2>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12">
        {DUMMY_RECIPE_CATEGORIES.map((category, index) => (
          <RecipeCategoryCard
            key={index}
            title={category.title}
            imageSrc={category.imageSrc}
            id={category.id}
          />
        ))}
      </div>

      {/* Title for Diets */}
      <h2 className="text-2xl sm:text-3xl font-bold text-left mb-8">
        Por dietas
      </h2>

      {/* Diet Cards Grid */}
      <div className="grid auto-rows-[180px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-12">
        {DUMMY_RECIPE_DIETS.map((diet, index) => (
          <RecipeDietCard
            key={index}
            diet={diet.title}
            imageSrc={diet.imageSrc}
            link={`/diets/${diet.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
