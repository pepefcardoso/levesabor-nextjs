"use client";

import { RecipeDifficultyEnum } from "@/typings/enums";
import { RecipeCategory, RecipeDiet, RecipeIngredient, RecipeStep } from "@/typings/recipe";
import { useEffect, useRef, useState } from "react";
import CustomTextInput, { InputType } from "../Inputs/CustomTextInput";
import CustomTextAreaInput from "../Inputs/CustomTextAreaInput";
import CustomInputSelect from "../Inputs/CustomSelectInput";
import CustomCheckboxInput from "../Inputs/CustomCheckboxInput";
import { IngredientForm } from "./IngredientForm";
import { Typography } from "@/constants/typography";
import Image from "next/image";
import { StepForm } from "./StepForm";
import FilledButton from "../Buttons/FilledButton";
import clsx from "clsx";
import { txtColors } from "@/constants/colors";
import TextButton from "../Buttons/TextButton";
import { useRouter } from "next/navigation";

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
  image_url: string;
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
    image_url: initialData?.image_url || "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(formData.image_url || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formData.image_url) {
      setPreviewImage(formData.image_url);
    }
  }, [formData.image_url]);

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

  const router = useRouter();

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
      data.append(`ingredients[${index}][name]`, ingredient.name || "");
      data.append(`ingredients[${index}][quantity]`, String(ingredient.quantity));
      data.append(`ingredients[${index}][unit_id]`, ingredient.unit_id || "");
    });
    formData.steps.forEach((step, index) => {
      data.append(`steps[${index}][description]`, step.description || "");
    });
    if (selectedImage) data.append("image", selectedImage);
    await onSubmit(data);
  };

  const difficultyOptions = Object.values(RecipeDifficultyEnum)
    .filter((v): v is number => typeof v === "number")
    .map((value) => ({ value, label: RecipeDifficultyEnum[value] }));

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <CustomTextInput
          label="Título"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          required
          maxLength={100}
          disabled={isSubmitting}
        />

        <CustomTextAreaInput
          label="Descrição"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          disabled={isSubmitting}
          rows={5}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomTextInput
            label="Tempo de Preparo (minutos)"
            type={InputType.Number}
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
            disabled={isSubmitting}
            min={0}
          />

          <CustomTextInput
            label="Porções"
            type={InputType.Number}
            value={formData.portion}
            onChange={(e) => setFormData({ ...formData, portion: e.target.value })}
            required
            disabled={isSubmitting}
            min={0}
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

        <div className="space-y-2">
          <label className={clsx(Typography.Subtitle)}>Dietas</label>
          <CustomCheckboxInput
            options={diets.map((diet) => ({ id: String(diet.id), label: diet.name }))}
            selected={formData.diets}
            onChange={handleDietChange}
            disabled={isSubmitting}
            placeholder="Selecione as dietas"
          />
        </div>

        <div className="space-y-2">
          <label className={clsx(Typography.Subtitle)}>Ingredientes</label>
          <IngredientForm
            onIngredientsChange={(ingredients) => setFormData({ ...formData, ingredients })}
            initialIngredients={formData.ingredients}
          />
        </div>

        <div className="space-y-2">
          <label className={clsx(Typography.Subtitle)}>Passos</label>
          <StepForm onStepsChange={(steps) => setFormData({ ...formData, steps })} initialSteps={formData.steps} />
        </div>

        <div className="space-y-6">
          <label className={clsx(Typography.Subtitle)}>Imagem da Receita</label>
          <div className="flex flex-col items-center gap-6">
            <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              {previewImage ? (
                <div className="relative group w-full max-w-[400px] h-[300px] rounded-md shadow-md overflow-hidden">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    width={400}
                    height={300}
                    unoptimized
                    className="object-cover w-full h-auto transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className={clsx(Typography.Body, txtColors.white)}>Clique para editar</p>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-[400px] h-[300px] p-8 border-2 border-dashed border-gray-400 rounded-2xl bg-gray-50 flex flex-col items-center justify-center">
                  <Image src="/image-icon.svg" alt="Upload Icon" width={48} height={48} className="mx-auto" />
                  <p className={clsx(Typography.Caption, txtColors.gray500, "mt-4")}>
                    Arraste ou clique para fazer upload
                  </p>
                </div>
              )}
            </div>
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

      <div className="flex justify-end items-center gap-8 mt-6">
        <TextButton
          onClick={() => router.back()}
          text="Voltar"
          disabled={isSubmitting}
          fontColor={txtColors.gray700}
        />
        <FilledButton
          text={"Salvar"}
          type="submit"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};
