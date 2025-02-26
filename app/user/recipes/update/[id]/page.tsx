"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  RecipeCategory,
  RecipeDiet,
  RecipeDifficultyEnum,
  RecipeIngredient,
  RecipeStep,
} from "../../../../../typings/api";
import { getRecipeCategories } from "../../../../../services/recipeCategoryService";
import { getRecipeDiets } from "../../../../../services/recipeDietService";
import { getRecipe, updateRecipe } from "../../../../../services/recipeService";
import { FormSkeleton } from "../../../../../components/Skeletons/FormSkeleton";
import { RecipeForm } from "../../../../../components/RecipeForm";

export default function UpdateUserRecipePage() {
  const router = useRouter();
  const params = useParams();
  const recipeId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [diets, setDiets] = useState<RecipeDiet[]>([]);
  const [initialData, setInitialData] = useState({
    title: "",
    description: "",
    time: "", // Changed to string
    portion: "", // Changed to string
    difficulty: RecipeDifficultyEnum.Normal,
    category_id: "",
    diets: [] as string[],
    ingredients: [] as RecipeIngredient[],
    steps: [] as RecipeStep[],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!recipeId) {
        toast.error("ID da receita inválido");
        return;
      }
      setIsLoadingData(true);
      try {
        const [categoriesRes, dietsRes, recipeRes] = await Promise.all([
          getRecipeCategories({ pagination: { page: 1, per_page: 50 } }),
          getRecipeDiets({ pagination: { page: 1, per_page: 50 } }),
          getRecipe(recipeId),
        ]);

        setCategories(categoriesRes.data);
        setDiets(dietsRes.data);

        setInitialData({
          title: recipeRes.title,
          description: recipeRes.description,
          time: recipeRes.time.toString(), // Convert number to string
          portion: recipeRes.portion.toString(), // Convert number to string
          difficulty: recipeRes.difficulty,
          category_id: recipeRes.category_id,
          diets: recipeRes.diets
            ? recipeRes.diets.map((d: RecipeDiet) => d.id)
            : [],
          ingredients: recipeRes.ingredients || [],
          steps: recipeRes.steps || [],
        });
      } catch (err) {
        console.error("Erro ao carregar dados da receita:", err);
        toast.error("Falha ao carregar dados da receita. Tente novamente.", {
          position: "bottom-left",
        });
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, [recipeId]);

  const handleUpdateRecipe = async (data: FormData) => {
    if (!recipeId) return;
    setIsSubmitting(true);
    try {
      await updateRecipe(recipeId, data);
      toast.success("Receita atualizada com sucesso!", {
        position: "bottom-left",
      });
      setTimeout(() => router.push("/user/recipes"), 2000);
    } catch (err) {
      console.error("Erro ao atualizar receita:", err);
      toast.error("Falha ao atualizar receita. Tente novamente.", {
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Atualizar Receita
      </h1>
      <RecipeForm
        initialData={initialData}
        categories={categories}
        diets={diets}
        isSubmitting={isSubmitting}
        onSubmit={handleUpdateRecipe}
      />
    </div>
  );
}
