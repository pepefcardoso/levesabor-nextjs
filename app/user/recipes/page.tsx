"use client";
import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../../../store/authStore";
import { Recipe } from "../../../typings/recipe";
import { PaginationResponse } from "../../../typings/pagination";
import { deleteRecipe, getMyRecipes } from "../../../services/recipeService";
import routes from "../../../routes/routes";
import CardSkeleton from "../../../components/Skeletons/CardSkeleton";
import EmptyList from "../../../components/Others/EmptyList";
import CustomBackgroundTextButton from "../../../components/Buttons/CustomBackgroundTextButton";
import CustomPaginator from "../../../components/Others/CustomPaginator";
import ListItemContentCard from "../../../components/Cards/ListItemContentCard";

export default function ListUserRecipes() {
  const { user } = useAuthStore();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUserRecipes = useCallback(async () => {
    setIsLoaded(false);
    try {
      if (!user) throw new Error("Usuário não autenticado");

      const response: PaginationResponse<Recipe> = await getMyRecipes({
        pagination: { page: currentPage, per_page: 10 },
      });
      setRecipes(response.data);
      setTotalPages(response.last_page);
      setIsLoaded(true);
    } catch {
      toast.error("Por favor, recarregue a página", {
        position: "bottom-left",
      });
      setIsLoaded(false);
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
      toast.error("Por favor, recarregue a página", {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Minhas Receitas</h1>
        <CustomBackgroundTextButton
          text="Adicionar Nova Receita"
          href={routes.user.recipes.create}
          backgroundColor="bg-yellow-500"
          fontColor="white"
        />
      </div>

      {!isLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <EmptyList message="Você ainda não criou nenhuma receita." />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <ListItemContentCard
                key={recipe.id}
                detailRoute={(id) => routes.recipes.details(id)}
                editRoute={(id) => routes.user.recipes.update(id)}
                handleDelete={handleDelete}
                item={recipe}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <CustomPaginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
