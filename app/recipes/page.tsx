"use client";

import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import NewsletterForm from "../../components/NewsletterForm";
import {
  PaginationResponse,
  Recipe,
  RecipeCategory,
  RecipeDiet,
  RecipeFilters,
} from "../../typings/api";
import { getRecipes } from "../../services/recipeService";
import CardSkeleton from "../../components/CardSkeleton";
import { getRecipeCategories } from "../../services/recipeCategoryService";
import { getRecipeDiets } from "../../services/recipeDietService";
import EmptyList from "../../components/EmptyList";

export default function RecipesHome() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [diets, setDiets] = useState<RecipeDiet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [filters, setFilters] = useState<RecipeFilters>({});

  const fetchRecipes = async (
    page: number,
    search: string,
    filters: RecipeFilters
  ) => {
    try {
      const response: PaginationResponse<Recipe> = await getRecipes({
        filters: {
          ...filters,
          title: search,
        },
        pagination: {
          page,
          per_page: 10,
        },
      });
      setRecipes(response.data);
      setTotalPages(response.last_page);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const response: PaginationResponse<RecipeCategory> =
        await getRecipeCategories({
          pagination: { page: 1, per_page: 100 },
        });
      setCategories(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  const fetchDiets = async () => {
    try {
      const response: PaginationResponse<RecipeDiet> = await getRecipeDiets({
        pagination: { page: 1, per_page: 100 },
      });
      setDiets(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchDiets();
  }, []);

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      try {
        await fetchRecipes(currentPage, searchQuery, filters);
      } finally {
        setLoading(false);
      }
    };
    loadRecipes();
  }, [currentPage, searchQuery, filters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(tempSearch);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, category_id: e.target.value }));
    setCurrentPage(1);
  };

  const handleDietChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const diets = prev.diets || [];
      return {
        ...prev,
        diets: checked
          ? [...diets, value]
          : diets.filter((diet) => diet !== value),
      };
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl w-full">
      <div className="px-4">
        <h1 className="text-3xl font-bold mb-8 text-left text-gray-800">
          Pesquisar Receitas
        </h1>

        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Pesquisar receitas..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Pesquisar
          </button>
        </form>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categorias
              </label>
              <select
                name="category_id"
                onChange={handleCategoryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.category_id || ""}
              >
                <option value="">Todas as Categorias</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietas
              </label>
              <div className="flex flex-col gap-2">
                {diets.map((diet) => (
                  <label key={diet.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={diet.id.toString()}
                      checked={
                        filters.diets?.includes(diet.id.toString()) || false
                      }
                      onChange={handleDietChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{diet.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4 flex flex-col">
            {" "}
            {error && (
              <div className="text-red-500 mb-4 text-center">{error}</div>
            )}
            <div className="flex-grow">
              {" "}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-full">
                {" "}
                {loading ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <CardSkeleton key={`skeleton-${index}`} />
                  ))
                ) : recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))
                ) : (
                  <div className="col-span-full h-full flex items-center justify-center">
                    {" "}
                    <EmptyList message="Nenhuma receita encontrada." />
                  </div>
                )}
              </div>
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 flex-wrap gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 border ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    } rounded-md transition-colors`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Próxima
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <NewsletterForm />
    </div>
  );
}
