"use client";

import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/Cards/RecipeCard";
import { getRecipes } from "../../services/recipeService";
import CardSkeleton from "../../components/Skeletons/CardSkeleton";
import { getRecipeCategories } from "../../services/recipeCategoryService";
import { getRecipeDiets } from "../../services/recipeDietService";
import EmptyList from "../../components/Others/EmptyList";
import toast from "react-hot-toast";
import NewsletterForm from "../../components/Forms/NewsletterForm";
import CustomBackgroundTextButton from "../../components/Buttons/CustomBackgroundTextButton";
import { Recipe, RecipeCategory, RecipeDiet, RecipeFilters } from "../../typings/recipe";
import { PaginationResponse } from "../../typings/pagination";
import CustomFormTextInput, { InputType } from "../../components/Inputs/CustomFormTextInput";
import CustomInputSelect from "../../components/Inputs/CustomSelectInput";
import CustomCheckboxInput from "../../components/Inputs/CustomCheckboxInput";
import CustomPaginator from "../../components/Others/CustomPaginator";

export default function RecipesHome() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [diets, setDiets] = useState<RecipeDiet[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
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
        filters: { ...filters, title: search },
        pagination: { page, per_page: 10 },
      });
      setRecipes(response.data);
      setTotalPages(response.last_page);
    } catch (err) {
      toast.error("Falha ao carregar receitas. Por favor, atualize a página.", {
        position: "bottom-left",
      });
      throw err;
    }
  };

  const fetchCategories = async () => {
    try {
      const response: PaginationResponse<RecipeCategory> = await getRecipeCategories({
        pagination: { page: 1, per_page: 100 },
      });
      setCategories(response.data);
    } catch {
      toast.error("Falha ao carregar categorias. Por favor, atualize a página.", {
        position: "bottom-left",
      });
    }
  };

  const fetchDiets = async () => {
    try {
      const response: PaginationResponse<RecipeDiet> = await getRecipeDiets({
        pagination: { page: 1, per_page: 100 },
      });
      setDiets(response.data);
    } catch {
      toast.error("Falha ao carregar dietas. Por favor, atualize a página.", {
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchDiets();
  }, []);

  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoaded(false);
      try {
        await fetchRecipes(currentPage, searchQuery, filters);
        setIsLoaded(true);
      } catch {
        setIsLoaded(false);
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

  const handleDietsChange = (selectedDiets: (string | number)[]) => {
    setFilters((prev) => ({ ...prev, diets: selectedDiets.map(String) }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const categoryOptions = [
    { value: "", label: "Todas as Categorias" },
    ...categories.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })),
  ];

  const dietOptions = diets.map((diet) => ({
    id: diet.id.toString(),
    label: diet.name,
  }));

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl w-full">
      <div className="px-4">
        <h1 className="text-3xl font-bold mb-8 text-left text-gray-800">
          Pesquisar Receitas
        </h1>
        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <CustomFormTextInput
            type={InputType.Text}
            placeholder="Pesquisar receitas..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
          />
          <CustomBackgroundTextButton
            text="Pesquisar"
            type="submit"
            backgroundColor="bg-blue-500"
            fontColor="white"
          />
        </form>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categorias
              </label>
              <CustomInputSelect
                name="category_id"
                value={filters.category_id || ""}
                onChange={handleCategoryChange}
                options={categoryOptions}
                placeholder="Todas as Categorias"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietas
              </label>
              <CustomCheckboxInput
                options={dietOptions}
                selected={filters.diets || []}
                onChange={handleDietsChange}
                variant="list"
              />
            </div>
          </div>
          <div className="w-full md:w-3/4 flex flex-col">
            <div className="flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-full">
                {!isLoaded ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <CardSkeleton key={`skeleton-${index}`} />
                  ))
                ) : recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))
                ) : (
                  <div className="col-span-full h-full flex items-center justify-center">
                    <EmptyList message="Nenhuma receita encontrada." />
                  </div>
                )}
              </div>
            </div>
            <CustomPaginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              previousLabel="Anterior"
              nextLabel="Próxima"
              className="mt-8"
            />
          </div>
        </div>
      </div>
      <NewsletterForm />
    </div>
  );
}
