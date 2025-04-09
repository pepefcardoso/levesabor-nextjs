"use client";

import { RecipeForm } from "@/components/Forms/RecipeForm";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import EmptyList from "@/components/Others/EmptyList";
import { Typography } from "@/constants/typography";
import { RecipeCategory, RecipeDiet } from "@/typings/recipe";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { recipeCategoryService, recipeDietService, recipeService } from "@/services/index";

export default function AddUserRecipePage() {
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [diets, setDiets] = useState<RecipeDiet[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      setHasError(false);
      try {
        const [categoriesRes, dietsRes] = await Promise.all([
          recipeCategoryService.getAll({ page: 1, per_page: 50 }),
          recipeDietService.getAll({ page: 1, per_page: 50 }),
        ]);
        setCategories(categoriesRes.data);
        setDiets(dietsRes.data);
      } catch {
        toast.error("Erro ao carregar categorias ou dietas. Tente novamente.");
        setHasError(true);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateRecipe = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await recipeService.create(data);
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

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyList
          title="Falha ao carregar dados"
          description="Ocorreu um erro ao carregar categorias ou dietas. Tente novamente."
          Icon={FaExclamationTriangle}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto px-6 py-10 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className={clsx(Typography.Title, "mb-12")}>Criar Nova Receita</h1>
        <RecipeForm categories={categories} diets={diets} isSubmitting={isSubmitting} onSubmit={handleCreateRecipe} />
      </div>
    </div>
  );
}
