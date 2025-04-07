"use client";

import { RecipeForm } from "@/components/Forms/RecipeForm";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { Typography } from "@/constants/typography";
import { recipeCategoryService, recipeDietService, recipeService } from "@/services/index";
import { RecipeDifficultyEnum } from "@/typings/enums";
import { RecipeCategory, RecipeDiet, RecipeIngredient, RecipeStep } from "@/typings/recipe";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    time: "",
    portion: "",
    difficulty: RecipeDifficultyEnum.Normal,
    category_id: "",
    diets: [] as string[],
    ingredients: [] as RecipeIngredient[],
    steps: [] as RecipeStep[],
    image_url: "",
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
          recipeCategoryService.getAll({ page: 1, per_page: 50 }),
          recipeDietService.getAll({ page: 1, per_page: 50 }),
          recipeService.getById(recipeId),
        ]);

        setCategories(categoriesRes.data);
        setDiets(dietsRes.data);

        setInitialData({
          title: recipeRes.title,
          description: recipeRes.description,
          time: recipeRes.time.toString(),
          portion: recipeRes.portion.toString(),
          difficulty: recipeRes.difficulty,
          category_id: recipeRes.category_id,
          diets: recipeRes.diets
            ? recipeRes.diets.map((d: RecipeDiet) => String(d.id))
            : [],
          ingredients: recipeRes.ingredients || [],
          steps: recipeRes.steps || [],
          image_url: recipeRes.image?.url ?? "",
        });
      } catch {
        toast.error("Falha ao carregar dados da receita. Tente novamente.");
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
      await recipeService.update(recipeId, data);
      toast.success("Receita atualizada com sucesso!");
      setTimeout(() => router.push("/user/recipes"), 2000);
    } catch {
      toast.error("Falha ao atualizar receita. Tente novamente.");
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
          Atualizar Receita #{recipeId}
        </h1>
        <RecipeForm
          initialData={initialData}
          categories={categories}
          diets={diets}
          isSubmitting={isSubmitting}
          onSubmit={handleUpdateRecipe}
        />
      </div>
    </div>
  );
}
