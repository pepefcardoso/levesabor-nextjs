"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { DUMMY_RECIPES } from "../../../constants";

// StepNumber Component
interface StepNumberProps {
  number: number;
}

const StepNumber = ({ number }: StepNumberProps) => {
  return (
    <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white font-bold rounded-lg">
      {number}
    </div>
  );
};

const RecipeDetails = () => {
  const { id } = useParams();

  const recipe = DUMMY_RECIPES.find((recipe) => recipe.id === Number(id));

  if (!recipe) {
    return <div className="text-center py-20">Receita não encontrada.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      {/* Category Tag */}
      <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded mb-4 inline-block text-left">
        {recipe.category}
      </span>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-left">{recipe.title}</h1>

      {/* Author Section */}
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src={recipe.authorImageSrc}
          alt={recipe.author}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <p className="text-gray-700 font-medium text-left">{recipe.author}</p>
      </div>

      {/* Recipe Image */}
      <div className="mb-6">
        <Image
          src={recipe.imageSrc}
          alt={recipe.title}
          width={600}
          height={340}
          className="rounded-lg object-cover w-full"
        />
      </div>

      {/* Tags */}
      <div className="flex gap-4 mb-6">
        <span className="bg-green-200 text-green-800 text-sm font-semibold px-3 py-1 rounded flex-1 text-center">
          Tempo: {recipe.time}
        </span>
        <span className="bg-green-200 text-green-800 text-sm font-semibold px-3 py-1 rounded flex-1 text-center">
          Dificuldade: {recipe.difficulty}
        </span>
        <span className="bg-green-200 text-green-800 text-sm font-semibold px-3 py-1 rounded flex-1 text-center">
          Rende {recipe.portions} porções
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-800 mb-8 text-left">{recipe.description}</p>

      {/* Ingredients */}
      <h2 className="text-2xl font-semibold mb-4">Ingredientes</h2>
      <ul className="list-disc list-inside mb-8 text-gray-800 space-y-2">
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      {/* Preparation Steps */}
      <h2 className="text-2xl font-semibold mb-4">Modo de Preparo</h2>
      <div className="space-y-6 mb-8">
        {recipe.steps.map((step: string, index: number) => (
          <div key={index} className="flex items-start gap-4">
            {/* Step Number */}
            <StepNumber number={index + 1} />

            {/* Step Description */}
            <p className="text-gray-800">{step}</p>
          </div>
        ))}
      </div>

      {/* Diet Tags */}
      <h2 className="text-2xl font-semibold mb-4">Dietas</h2>
      <div className="flex flex-wrap gap-3 mb-8 text-left">
        {recipe.diets.map((tag: string, index: number) => (
          <span
            key={index}
            className="bg-yellow-200 text-yellow-800 text-sm font-semibold px-3 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;
