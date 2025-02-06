"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import CardSkeleton from "../components/CardSkeleton";

type Recipe = {
  id: number;
  title: string;
  description: string;
  time: number;
  portion: number;
  difficulty: number;
  category: { name: string };
  diets: { name: string }[];
  image: { url: string } | null;
};

interface RecipePaginationResponse {
  data: Recipe[];
  current_page: number;
  last_page: number;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    title: "",
    category_id: "",
    diets: [],
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchRecipes = async () => {
    try {
      const response: RecipePaginationResponse = await getRecipes({
        filters,
        page: 1,
        perPage: 4,
      });
      setRecipes(response.data);
      setPagination({
        currentPage: response.current_page,
        totalPages: response.last_page,
      });
    } catch (err) {
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [filters, pagination.currentPage]);

  return (
    <section className="max-container padding-container flex flex-col gap-10 py-12 pb-12 lg:py-16">
      {/* Header section remains visible */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">
          Cozinha inclusiva para todas as dietas.
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Explore as nossas receitas deliciosas e artigos informativos!
        </p>
      </div>

      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-left">Receitas</h2>
          <Link href="/recipes" className="text-blue-500 hover:underline">
            Ver Todas
          </Link>
        </div>

        {/* Display error if present */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? [1, 2, 3, 4].map((skeletonId) => (
                <CardSkeleton key={skeletonId} />
              ))
            : recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  description={recipe.description}
                  imageSrc={
                    recipe.image?.url ||
                    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  diets={recipe.diets.map((diet) => diet.name)}
                  category={recipe.category.name}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
