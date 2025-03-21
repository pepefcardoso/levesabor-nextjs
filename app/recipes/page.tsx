"use client";

import FilledButton from "@/components/Buttons/FilledButton";
import RecipeCard from "@/components/Cards/RecipeCard";
import NewsletterForm from "@/components/Forms/NewsletterForm";
import CustomCheckboxInput from "@/components/Inputs/CustomCheckboxInput";
import CustomInputSelect from "@/components/Inputs/CustomSelectInput";
import CustomTextInput from "@/components/Inputs/CustomTextInput";
import Paginator from "@/components/Others/Paginator";
import EmptyList from "@/components/Others/EmptyList";
import CardSkeleton from "@/components/Skeletons/CardSkeleton";
import { Typography } from "@/constants/typography";
import { getRecipeCategories } from "@/services/recipeCategoryService";
import { getRecipeDiets } from "@/services/recipeDietService";
import { getRecipes } from "@/services/recipeService";
import { ButtonTypes, ButtonHovers } from "@/typings/buttons";
import { PaginationResponse } from "@/typings/pagination";
import { Recipe, RecipeCategory, RecipeDiet, RecipeFilters } from "@/typings/recipe";
import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";

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

  const fetchRecipes = async (page: number, search: string, filters: RecipeFilters) => {
    try {
      const response: PaginationResponse<Recipe> = await getRecipes({
        filters: { ...filters, title: search },
        pagination: { page, per_page: 10 },
      });
      setRecipes(response.data);
      setTotalPages(response.last_page);
    } catch (err) {
      toast.error("Por favor, atualize a página.", { id: "error-message" });
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
      toast.error("Por favor, atualize a página.", { id: "error-message" });
    }
  };

  const fetchDiets = async () => {
    try {
      const response: PaginationResponse<RecipeDiet> = await getRecipeDiets({
        pagination: { page: 1, per_page: 100 },
      });
      setDiets(response.data);
    } catch {
      toast.error("Por favor, atualize a página.", { id: "error-message" });
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
    <div className="container mx-auto px-4 py-8 max-w-7xl w-full space-y-8">
      <div className="px-4">
        <h1 className={clsx(Typography.Headline, "mb-4 sm:mb-6 text-left")}>Pesquisar Receitas</h1>
        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <CustomTextInput
            placeholder="Pesquisar receitas..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
          />
          <FilledButton text="Pesquisar" type={ButtonTypes.submit} hoverAnimation={ButtonHovers.opacity} />
        </form>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full sm:w-1/5 mr-4">
            <div className="flex flex-row md:flex-col gap-4">
              <div className="w-1/2 sm:w-full">
                <div className="mb-6">
                  <label className={clsx(Typography.Subtitle, "block mb-2")}>Categorias</label>
                  <CustomInputSelect
                    name="category_id"
                    value={filters.category_id || ""}
                    onChange={handleCategoryChange}
                    options={categoryOptions}
                    placeholder="Todas as Categorias"
                  />
                </div>
              </div>
              <div className="w-1/2 sm:w-full">
                <div className="mb-6">
                  <label className={clsx(Typography.Subtitle, "block mb-2")}>Dietas</label>
                  <CustomCheckboxInput
                    options={dietOptions}
                    selected={filters.diets || []}
                    onChange={handleDietsChange}
                    placeholder="Todas as dietas"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/5 flex flex-col">
            <div className="flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                {!isLoaded ? (
                  Array.from({ length: 10 }).map((_, index) => <CardSkeleton key={`skeleton-${index}`} />)
                ) : recipes.length > 0 ? (
                  recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
                ) : (
                  <div className="col-span-full flex justify-center">
                    <EmptyList
                      title="Nenhuma receita foi encontrada"
                      description="Tente outra busca"
                      Icon={FaExclamationTriangle}
                    />
                  </div>
                )}
              </div>
            </div>
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-12"
            />
          </div>
        </div>
      </div>
      <NewsletterForm />
    </div>
  );
}
