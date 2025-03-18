"use client";

import { RecipeForm } from "@/components/Forms/RecipeForm";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { Typography } from "@/constants/typography";
import { getRecipeCategories } from "@/services/recipeCategoryService";
import { getRecipeDiets } from "@/services/recipeDietService";
import { createRecipe } from "@/services/recipeService";
import { RecipeCategory, RecipeDiet } from "@/typings/recipe";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      } catch {
        toast.error("Erro ao carregar categorias ou dietas. Tente novamente.");
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
      toast.success("Receita criada com sucesso!");
      setTimeout(() => router.push("/user/recipes"), 2000);
    } catch {
      toast.error("Falha ao criar a receita. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return <PageSkeleton />;
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className={clsx(Typography.Title, "mb-12")}>
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
  );
}
