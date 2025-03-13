"use client";

import AuthorInfo from "@/components/Others/AuthorInfo";
import CustomChip from "@/components/Others/CustomChip";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { bgColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { getRecipe } from "@/services/recipeService";
import { Recipe } from "@/typings/recipe";
import { clsx } from "clsx";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatDate, sanitizeImageUrl } from "tools/helper";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        setIsLoaded(false);
        try {
          const data = await getRecipe(id as string);
          setRecipe(data);
          setIsLoaded(true);
        } catch (err) {
          const message = err instanceof Error ? err.message : "Falha ao carregar receita";
          toast.error(message);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  if (!isLoaded) return <PageSkeleton />;
  if (!recipe) return <div className="text-center py-20">Receita não encontrada.</div>;

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="mb-4">
        <CustomChip bgColor={bgColors.secondary} text={recipe.category?.name || ""} />
      </div>

      <h1 className={clsx(Typography.Display, "mb-6 text-left")}>{recipe.title}</h1>

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
          alt={recipe.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6 justify-center text-center">
        <CustomChip className="px-6 py-2" typography={Typography.Footnote} text={`Tempo: ${recipe.time} min`} />
        <CustomChip className="px-6 py-2" typography={Typography.Footnote} text={`Dificuldade: ${recipe.difficulty}`} />
        <CustomChip className="px-6 py-2" typography={Typography.Footnote} text={`Rende ${recipe.portion} porções`} />
      </div>


      <p className={clsx(Typography.Title, "text-left mb-8")}>{recipe.description}</p>

      <h2 className={clsx(Typography.Headline, "mb-4")}>Ingredientes</h2>
      <ul className={clsx(Typography.Title, "list-disc list-inside mb-8 space-y-2")}>
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index} className={clsx(Typography.Title)}>
            {ingredient.quantity} {ingredient.unit?.name} de {ingredient.name}
          </li>
        ))}
      </ul>
      <h2 className={clsx(Typography.Headline, "mb-4")}>Modo de Preparo</h2>
      <div className="space-y-6 mb-8">
        {recipe.steps?.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={clsx(Typography.Headline, bgColors.tertiary, "flex items-center justify-center w-8 h-8 min-w-8 min-h-8 flex-shrink-0 rounded-lg shadow-md")}>
              {index + 1}
            </div>
            <p className={clsx(Typography.Title)}>{step.description}</p>
          </div>
        ))}
      </div>

      <h2 className={clsx(Typography.Headline, "mb-4")}>Dietas</h2>
      <div className="flex flex-wrap gap-3 mb-8 text-left">
        {recipe.diets?.map((diet) => (
          <CustomChip key={diet.id} text={diet.name} />
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;
