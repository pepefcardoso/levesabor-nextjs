"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { createRecipe } from "../../../../services/recipeService";
import {
  RecipeCategory,
  RecipeDiet,
  RecipeDifficultyEnum,
  RecipeIngredient,
  RecipeStep,
} from "../../../../typings/api";
import { getRecipeCategories } from "../../../../services/recipeCategoryService";
import { getRecipeDiets } from "../../../../services/recipeDietService";
import { IngredientForm } from "../../../../components/IngredientForm";
import { StepForm } from "../../../../components/StepForm";
import { FormSkeleton } from "../../../../components/FormSkeleton";

export default function CreateRecipe() {
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [diets, setDiets] = useState<RecipeDiet[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time: "",
    portion: "",
    difficulty: RecipeDifficultyEnum.Normal,
    category_id: "",
    diets: [] as string[],
    ingredients: [] as RecipeIngredient[],
    steps: [] as RecipeStep[],
  });

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
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar categorias ou dietas. Tente novamente.", {
          position: "bottom-left",
        });
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDietChange = (dietId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      diets: checked
        ? [...prev.diets, dietId]
        : prev.diets.filter((id) => id !== dietId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (["ingredients", "steps", "diets"].includes(key)) {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, String(value));
        }
      });
      if (selectedImage) data.append("image", selectedImage);

      await createRecipe(data);
      toast.success("Receita criada com sucesso!", { position: "bottom-left" });
      setTimeout(() => router.push("/user/recipes"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Falha ao criar a receita. Tente novamente.", {
        position: "bottom-left",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData || isSubmitting) {
    return <FormSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Criar Nova Receita
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Título
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
            required
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
            className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
            required
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
            className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
            required
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
            className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
            required
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
            className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
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
            className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
            required
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
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Passos
          </label>
          <StepForm
            onStepsChange={(steps) => setFormData({ ...formData, steps })}
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
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 text-lg transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? "Criando..." : "Criar Receita"}
          </button>
        </div>
      </form>
    </div>
  );
}
