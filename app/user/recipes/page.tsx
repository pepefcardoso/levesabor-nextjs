"use client";

import FilledButton from "@/components/Buttons/FilledButton";
import ContentCard from "@/components/Cards/ContentCard";
import EmptyList from "@/components/Others/EmptyList";
import Paginator from "@/components/Others/Paginator";
import CardSkeleton from "@/components/Skeletons/CardSkeleton";
import { Typography } from "@/constants/typography";
import { deleteRecipe, getMyRecipes } from "@/services/recipeService";
import { ButtonHovers } from "@/typings/buttons";
import { PaginationResponse } from "@/typings/pagination";
import { Recipe } from "@/typings/recipe";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import routes from "routes/routes";
import useAuthStore from "store/authStore";

export default function ListUserRecipes() {
  const { user } = useAuthStore();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasError, setHasError] = useState(false);

  const fetchUserRecipes = useCallback(async () => {
    setIsLoaded(false);
    setHasError(false);
    try {
      if (!user) throw new Error("Usuário não autenticado");

      const response: PaginationResponse<Recipe> = await getMyRecipes({
        pagination: { page: currentPage, per_page: 10 },
      });
      setRecipes(response.data);
      setTotalPages(response.last_page);
      setIsLoaded(true);
    } catch {
      toast.error("Por favor, tente novamente", { id: "error-message" });
      setHasError(true);
      setIsLoaded(true);
    }
  }, [user, currentPage]);

  useEffect(() => {
    fetchUserRecipes();
  }, [fetchUserRecipes]);

  const handleDelete = async (recipeId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta receita?")) return;
    try {
      await deleteRecipe(recipeId);
      if (recipes.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchUserRecipes();
      }
    } catch {
      toast.error("Por favor, tente novamente", { id: "error-message" });
    }
  };

  if (hasError) {
    return (
      <div className="min-h-screen mx-auto flex items-center justify-center">
        <EmptyList
          title="Por favor, tente novamente"
          description="Ocorreu um erro ao carregar suas receitas"
          Icon={FaExclamationTriangle}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className={clsx(Typography.Headline, "mb-4 md:mb-0")}>Minhas Receitas</h1>
        <FilledButton
          text="Adicionar Nova Receita"
          href={routes.user.recipes.create}
          hoverAnimation={ButtonHovers.opacity}
        />
      </div>

      {!isLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <EmptyList title="Você ainda não criou nenhum post." />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <ContentCard
                key={recipe.id}
                detailRoute={(id) => routes.recipes.details(id)}
                editRoute={(id) => routes.user.recipes.update(id)}
                handleDelete={handleDelete}
                item={recipe}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-10"
            />
          )}
        </>
      )}
    </div>
  );
}
