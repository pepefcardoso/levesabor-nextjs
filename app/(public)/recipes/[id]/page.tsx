"use client";

import AuthorInfo from "@/components/Others/AuthorInfo";
import CustomChip from "@/components/Others/CustomChip";
import EmptyList from "@/components/Others/EmptyList";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { bgColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { RecipeDifficultyEnum } from "@/typings/enums";
import { Recipe } from "@/typings/recipe";
import { clsx } from "clsx";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { formatDate, sanitizeImageUrl } from "../../../../tools/helper";
import { recipeService } from "@/services/index";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        setIsLoaded(false);
        try {
          const data = await recipeService.getById(id as string);
          setRecipe(data);
          setIsLoaded(true);
        } catch (err) {
          const message = err instanceof Error ? err.message : "Falha ao carregar receita";
          toast.error(message);
          setRecipe(null);
          setIsLoaded(true);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  if (!isLoaded) return <PageSkeleton />;
  if (!recipe)
    return (
      <div className="min-h-screen mx-auto flex items-center justify-center">
        <EmptyList title="Receita não encontrada" description="Tente outra busca" Icon={FaExclamationTriangle} />
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-8 max-w-5xl">
      <div className="mb-4">
        <CustomChip bgColor={bgColors.secondary} text={recipe.category?.name || ""} />
      </div>

      <h1 className={clsx(Typography.Headline, "mb-6 text-left")}>{recipe.title}</h1>

      <div className="mb-8">
        <AuthorInfo
          authorName={recipe.user?.name || "Autor"}
          authorImage={recipe.user?.image ? sanitizeImageUrl(recipe.user.image.url) : null}
          postDate={recipe.created_at ? `Postado em ${formatDate(recipe.created_at)}` : "Data indisponível"}
        />
      </div>

      <div className="relative w-full h-[340px] mb-6 rounded-lg overflow-hidden">
        <Image
          src={sanitizeImageUrl(recipe.image?.url) || "/placeholder.jpg"}
          alt={recipe.title || "Imagem da receita"}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6 justify-center text-center">
        <CustomChip className="w-1/3" typography={Typography.Subtitle} text={`Tempo: ${recipe.time} min`} />
        <CustomChip className="w-1/3" typography={Typography.Subtitle} text={`Dificuldade: ${recipe.difficulty ? RecipeDifficultyEnum[recipe.difficulty] : RecipeDifficultyEnum.Normal}`} />
        <CustomChip className="w-1/3" typography={Typography.Subtitle} text={`Rende ${recipe.portion} porções`} />
      </div>

      <p className={clsx(Typography.Body, "text-left mb-8")}>{recipe.description}</p>

      <h2 className={clsx(Typography.Title, "mb-4")}>Ingredientes</h2>
      <ul className={clsx("list-disc list-inside mb-8 space-y-2")}>
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index} className={clsx(Typography.Body)}>
            {ingredient.quantity} {ingredient.unit?.name} de {ingredient.name}
          </li>
        ))}
      </ul>
      <h2 className={clsx(Typography.Title, "mb-4")}>Modo de Preparo</h2>
      <div className="space-y-6 mb-8">
        {recipe.steps?.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div
              className={clsx(
                Typography.Title,
                bgColors.tertiary,
                "flex items-center justify-center w-8 h-8 min-w-8 min-h-8 flex-shrink-0 rounded-lg shadow-md"
              )}
            >
              {index + 1}
            </div>
            <p className={clsx(Typography.Body)}>{step.description}</p>
          </div>
        ))}
      </div>

      <h2 className={clsx(Typography.Title, "mb-4")}>Dietas</h2>
      <div className="flex flex-wrap gap-3 mb-8 text-left">
        {recipe.diets?.map((diet) => (
          <CustomChip key={diet.id} text={diet.name} />
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;
