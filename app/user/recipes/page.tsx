"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import useAuthStore from "../../../store/authStore";
import {
  PaginationResponse,
  Recipe,
} from "../../../typings/api";
import { deleteRecipe, getMyRecipes } from "../../../services/recipeService";
import CardSkeleton from "../../../components/CardSkeleton";
import EmptyList from "../../../components/EmptyList";
import UserRecipeListCard from "../../../components/Cards/UserRecipeListCard";

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
        <Link
          href="/user/recipes/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Adicionar Nova Receita
        </Link>
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
              <UserRecipeListCard
                key={recipe.id}
                recipe={recipe}
                handleDelete={handleDelete}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border rounded-md ${currentPage === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "hover:bg-gray-50"
                      }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}