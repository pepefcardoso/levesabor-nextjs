"use client";

import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import NewsletterForm from "../../components/NewsletterForm";
import { PaginationResponse, Recipe } from "../../typings/api";
import { getRecipes } from "../../services/recipeService";
import CardSkeleton from "../../components/CardSkeleton";

export default function RecipesHome() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      const response: PaginationResponse<Recipe> = await getRecipes({
        filters: undefined,
        pagination: {
          page: 1,
          perPage: 4,
        },
      });
      setRecipes(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchRecipes()])
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl w-full">
      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-left">
            Últimos Recipes
          </h2>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? [1, 2, 3, 4].map((skeletonId) => (
                <CardSkeleton key={skeletonId} />
              ))
            : recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
      </div>

      <NewsletterForm />
    </div>
  );
}
