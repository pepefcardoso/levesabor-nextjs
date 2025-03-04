"use client";
import React, { useState, useRef } from "react";
import { IngredientForm } from "./IngredientForm";
import { StepForm } from "./StepForm";
import { RecipeDifficultyEnum } from "../../typings/enums";
import { RecipeCategory, RecipeDiet, RecipeIngredient, RecipeStep } from "../../typings/recipe";
import CustomTextInput, { InputType } from "../Inputs/CustomTextInput";
import CustomTextAreaInput from "../Inputs/CustomTextAreaInput";
import CustomInputSelect from "../Inputs/CustomSelectInput";
import CustomCheckboxInput from "../Inputs/CustomCheckboxInput";
import CustomImage from "../Others/CustomImage";
import FilledButton from "../Buttons/FilledButton";
import { Typography } from "../../constants/typography";
import { txtColors } from "../../constants/colors";

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

export const RecipeForm: React.FC<RecipeFormProps> = ({ initialData, categories, diets, isSubmitting, onSubmit }) => {
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDietChange = (selected: (string | number)[]) => {
    setFormData((prev) => ({ ...prev, diets: selected.map(String) }));
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
    formData.diets.forEach((dietId) => {
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

  const difficultyOptions = Object.values(RecipeDifficultyEnum)
    .filter((v): v is number => typeof v === "number")
    .map((value) => ({ value, label: RecipeDifficultyEnum[value] }));

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <CustomTextInput
          label="Título"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={isSubmitting}
        />

        <CustomTextAreaInput
          label="Descrição"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          disabled={isSubmitting}
          rows={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomTextInput
            label="Tempo de Preparo (minutos)"
            type={InputType.Number}
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
            disabled={isSubmitting}
          />

          <CustomTextInput
            label="Porções"
            type={InputType.Number}
            value={formData.portion}
            onChange={(e) => setFormData({ ...formData, portion: e.target.value })}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInputSelect
            label="Dificuldade"
            value={formData.difficulty}
            onChange={(e) =>
              setFormData({
                ...formData,
                difficulty: Number(e.target.value) as RecipeDifficultyEnum,
              })
            }
            options={difficultyOptions}
            disabled={isSubmitting}
          />

          <CustomInputSelect
            label="Categoria"
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            options={[
              { value: "", label: "Selecione uma categoria" },
              ...categories.map((category) => ({ value: category.id, label: category.name })),
            ]}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className={`${Typography.h6} mb-4`} style={{ color: txtColors.gray500 }}>
            Dietas
          </label>
          <CustomCheckboxInput
            options={diets.map((diet) => ({ id: diet.id, label: diet.name }))}
            selected={formData.diets}
            onChange={handleDietChange}
            variant="grid"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className={`${Typography.h6} mb-3`} style={{ color: txtColors.gray500 }}>
            Ingredientes
          </label>
          <IngredientForm
            onIngredientsChange={(ingredients) => setFormData({ ...formData, ingredients })}
            initialIngredients={formData.ingredients}
          />
        </div>

        <div>
          <label className={`${Typography.h6} mb-3`} style={{ color: txtColors.gray500 }}>
            Passos
          </label>
          <StepForm onStepsChange={(steps) => setFormData({ ...formData, steps })} initialSteps={formData.steps} />
        </div>

        <div>
          <label className={`${Typography.h6} mb-4`} style={{ color: txtColors.gray500 }}>
            Imagem da Receita
          </label>
          <div className="flex flex-col items-center gap-6">
            {previewImage ? (
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <CustomImage
                  src={previewImage}
                  alt="Preview"
                  width={300}
                  height={200}
                  rounded="md"
                  objectFit="cover"
                  shadow="md"
                  className="hover:opacity-80 transition-all"
                />
              </div>
            ) : (
              <div className="w-full max-w-md p-8 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-600">Arraste ou clique para fazer upload</p>
              </div>
            )}

            <FilledButton
              text={previewImage ? "Alterar Imagem" : "Selecionar Arquivo"}
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              color="bg-white"
              className="px-6 py-2"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-8">
        <FilledButton
          text={isSubmitting ? "Salvando..." : "Salvar Receita"}
          type="submit"
          disabled={isSubmitting}
          color="bg-yellow-400"
          className={`${Typography.button} text-black hover:bg-yellow-500 transition-colors shadow-sm font-medium text-base disabled:bg-gray-300 disabled:cursor-not-allowed`}
        />
      </div>
    </form>
  );
};
