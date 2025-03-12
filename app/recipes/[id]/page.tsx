"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getRecipe } from "../../../services/recipeService";
import { sanitizeImageUrl } from "../../../tools/helper";
import PageLoadingSkeleton from "../../../components/Skeletons/PageLoadingSkeleton";
import toast from "react-hot-toast";
import { Recipe } from "../../../typings/recipe";
import CustomChip from "../../../components/Others/CustomChip";
import AuthorInfo from "../../../components/Others/AuthorInfo";
import { StepListItem } from "../../../components/Others/StepListItem";
import { IngredientListItem } from "../../../components/Others/IngredientListItem";
import { bgColors } from "../../../constants/colors";
import Image from "next/image";

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

  if (!isLoaded) return <PageLoadingSkeleton />;
  if (!recipe) return <div className="text-center py-20">Receita não encontrada.</div>;

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="mb-4">
        <CustomChip bgColor={bgColors.secondary} fontColor="white" text={recipe.category?.name || ""} />
      </div>

      <h1 className="text-3xl font-bold mb-4 text-left">{recipe.title}</h1>

      <div className="mb-6">
        <AuthorInfo
          authorName={recipe.user?.name || "Autor"}
          authorImage={recipe.user?.image ? sanitizeImageUrl(recipe.user.image.url) : null}
          postDate={recipe.created_at || "Data desconhecida"}
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

      <div className="flex gap-4 mb-6">
        <CustomChip bgColor={bgColors.tertiary} fontColor="white" text={`Tempo: ${recipe.time} min`} />
        <CustomChip bgColor={bgColors.tertiary} fontColor="white" text={`Dificuldade: ${recipe.difficulty}`} />
        <CustomChip bgColor={bgColors.tertiary} fontColor="white" text={`Rende ${recipe.portion} porções`} />
      </div>

      <p className="text-gray-800 mb-8 text-left">{recipe.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Ingredientes</h2>
      <ul className="list-disc list-inside mb-8 text-gray-800 space-y-2">
        {recipe.ingredients?.map((ingredient, index) => (
          <IngredientListItem key={index} ingredient={ingredient} />
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Modo de Preparo</h2>
      <div className="space-y-6 mb-8">
        {recipe.steps?.map((step, index) => (
          <StepListItem key={index} step={step} index={index} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Dietas</h2>
      <div className="flex flex-wrap gap-3 mb-8 text-left">
        {recipe.diets?.map((diet) => (
          <CustomChip key={diet.id} bgColor={bgColors.tertiary} fontColor="white" text={diet.name} />
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;
