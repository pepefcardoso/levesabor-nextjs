"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Recipe } from "../../../typings/api";
import { getRecipe } from "../../../services/recipeService";
import { sanitizeImageUrl } from "../../../tools/helper";
import PageLoadingSkeleton from "../../../components/PageLoadingSkeleton";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const recipe: Recipe = await getRecipe(id as string);
          setRecipe(recipe);
        } catch (err: any) {
          setError(err.message);
          console.error("API Error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return <PageLoadingSkeleton />;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center py-20">Receita não encontrada.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded mb-4 inline-block text-left">
        {recipe.category?.name}
      </span>

      <h1 className="text-3xl font-bold mb-4 text-left">{recipe.title}</h1>

      <div className="flex items-center space-x-4 mb-6">
        <Image
          src={sanitizeImageUrl(recipe.user?.image?.url)}
          alt={recipe.user?.name || "Autor"}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <p className="text-gray-700 font-medium text-left">
          {recipe.user?.name}
        </p>
      </div>

      <div className="mb-6">
        <Image
          src={sanitizeImageUrl(recipe.image?.url)}
          alt={recipe.title}
          width={600}
          height={340}
          className="rounded-lg object-cover w-full"
        />
      </div>

      <div className="flex gap-4 mb-6">
        <span className="bg-green-200 text-green-800 text-sm font-semibold px-3 py-1 rounded flex-1 text-center">
          Tempo: {recipe.time} min
        </span>
        <span className="bg-green-200 text-green-800 text-sm font-semibold px-3 py-1 rounded flex-1 text-center">
          Dificuldade: {recipe.difficulty}
        </span>
        <span className="bg-green-200 text-green-800 text-sm font-semibold px-3 py-1 rounded flex-1 text-center">
          Rende {recipe.portion} porções
        </span>
      </div>

      <p className="text-gray-800 mb-8 text-left">{recipe.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Ingredientes</h2>
      <ul className="list-disc list-inside mb-8 text-gray-800 space-y-2">
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.unit?.name} de {ingredient.name}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Modo de Preparo</h2>
      <div className="space-y-6 mb-8">
        {recipe.steps?.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full">
              {index + 1}
            </div>

            <p className="text-gray-800">{step.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Dietas</h2>
      <div className="flex flex-wrap gap-3 mb-8 text-left">
        {recipe.diets?.map((diet, index) => (
          <span
            key={index}
            className="bg-yellow-200 text-yellow-800 text-sm font-semibold px-3 py-1 rounded"
          >
            {diet.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;
