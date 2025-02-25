"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RecipeCategory, RecipeDiet, RecipeDifficultyEnum, RecipeIngredient, RecipeStep } from "../typings/api";
import { IngredientForm } from "./IngredientForm";
import { StepForm } from "./StepForm";

interface FormDataValues {
  title: string;
  description: string;
  time: string;
  portion: string;
  difficulty: RecipeDifficultyEnum;
  category_id: string;
  diets: string[];
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
}

interface RecipeFormProps {
  initialData?: FormDataValues;
  categories: RecipeCategory[];
  diets: RecipeDiet[];
  isSubmitting: boolean;
  onSubmit: (data: FormData) => Promise<void>;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({
  initialData,
  categories,
  diets,
  isSubmitting,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormDataValues>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    time: initialData?.time || "",
    portion: initialData?.portion || "",
    difficulty: initialData?.difficulty || RecipeDifficultyEnum.Normal,
    category_id: initialData?.category_id || "",
    diets: initialData?.diets || [],
    ingredients: initialData?.ingredients || [],
    steps: initialData?.steps || [],
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleDietChange = (dietId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      diets: checked
        ? [...prev.diets, dietId]
        : prev.diets.filter((id) => id !== dietId),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("time", formData.time);
    data.append("portion", formData.portion);
    data.append("difficulty", String(formData.difficulty));
    data.append("category_id", formData.category_id);

    formData.diets.forEach(dietId => {
      data.append("diets[]", dietId);
    });

    formData.ingredients.forEach((ingredient, index) => {
      data.append(`ingredients[${index}][name]`, ingredient.name);
      data.append(`ingredients[${index}][quantity]`, String(ingredient.quantity));
      data.append(`ingredients[${index}][unit_id]`, ingredient.unit_id);
    });

    formData.steps.forEach((step, index) => {
      data.append(`steps[${index}][description]`, step.description);
      data.append(`steps[${index}][order]`, String(index + 1));
    });

    if (selectedImage) data.append("image", selectedImage);

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Título
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Descrição
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Tempo de Preparo (minutos)
        </label>
        <input
          type="number"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Porções
        </label>
        <input
          type="number"
          value={formData.portion}
          onChange={(e) =>
            setFormData({ ...formData, portion: e.target.value })
          }
          className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Dificuldade
        </label>
        <select
          value={formData.difficulty}
          onChange={(e) =>
            setFormData({
              ...formData,
              difficulty: Number(e.target.value) as RecipeDifficultyEnum,
            })
          }
          className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {Object.values(RecipeDifficultyEnum)
            .filter((v): v is number => typeof v === "number")
            .map((value) => (
              <option key={value} value={value}>
                {RecipeDifficultyEnum[value]}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Categoria
        </label>
        <select
          value={formData.category_id}
          onChange={(e) =>
            setFormData({ ...formData, category_id: e.target.value })
          }
          className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          required
          disabled={isSubmitting}
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Dietas
        </label>
        <div className="flex flex-wrap gap-4">
          {diets.map((diet) => (
            <label key={diet.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={diet.id}
                checked={formData.diets.includes(diet.id)}
                onChange={(e) => handleDietChange(diet.id, e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              />
              <span className="text-gray-700">{diet.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Ingredientes
        </label>
        <IngredientForm
          onIngredientsChange={(ingredients) =>
            setFormData({ ...formData, ingredients })
          }
          initialIngredients={formData.ingredients}
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Passos
        </label>
        <StepForm
          onStepsChange={(steps) => setFormData({ ...formData, steps })}
          initialSteps={formData.steps}
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Imagem da Receita
        </label>
        {previewImage && (
          <Image
            src={previewImage}
            alt="Preview"
            width={150}
            height={150}
            className="mb-4 rounded"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 text-lg transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? "Salvando..." : "Salvar Receita"}
        </button>
      </div>
    </form>
  );
};