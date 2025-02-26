"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RecipeCategory, RecipeDiet } from "../../../../typings/api";
import { getRecipeCategories } from "../../../../services/recipeCategoryService";
import { getRecipeDiets } from "../../../../services/recipeDietService";
import { FormSkeleton } from "../../../../components/Skeletons/FormSkeleton";
import { RecipeForm } from "../../../../components/RecipeForm";
import { createRecipe } from "../../../../services/recipeService";

export default function AddUserRecipePage() {
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [diets, setDiets] = useState<RecipeDiet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const [categoriesRes, dietsRes] = await Promise.all([
          getRecipeCategories({ pagination: { page: 1, per_page: 50 } }),
          getRecipeDiets({ pagination: { page: 1, per_page: 50 } }),
        ]);
        setCategories(categoriesRes.data);
        setDiets(dietsRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar categorias ou dietas. Tente novamente.", {
          position: "bottom-left",
        });
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateRecipe = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await createRecipe(data);
      toast.success("Receita criada com sucesso!", { position: "bottom-left" });
      setTimeout(() => router.push("/user/recipes"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Falha ao criar a receita. Tente novamente.", {
        position: "bottom-left",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return <FormSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#d3d3d3] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Criar Nova Receita
          </h1>
          <RecipeForm
            categories={categories}
            diets={diets}
            isSubmitting={isSubmitting}
            onSubmit={handleCreateRecipe}
          />
        </div>
      </div>
    </div>
  );
}
