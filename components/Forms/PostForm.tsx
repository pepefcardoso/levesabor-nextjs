"use client";
import React, { useState, useRef } from "react";
import { PostCategory, PostTopic } from "../../typings/post";
import CustomTextInput from "../Inputs/CustomTextInput";
import CustomTextAreaInput from "../Inputs/CustomTextAreaInput";
import CustomInputSelect from "../Inputs/CustomSelectInput";
import CustomCheckboxInput from "../Inputs/CustomCheckboxInput";
import FilledButton from "../Buttons/FilledButton";
import { Typography } from "../../constants/typography";
import { txtColors } from "../../constants/colors";
import Image from "next/image";

interface FormDataValues {
  title: string;
  summary: string;
  content: string;
  category_id: string;
  topics: string[];
}

interface PostFormProps {
  initialData?: FormDataValues;
  categories: PostCategory[];
  topics: PostTopic[];
  isSubmitting: boolean;
  onSubmit: (data: FormData) => Promise<void>;
}

export const PostForm: React.FC<PostFormProps> = ({ initialData, categories, topics, isSubmitting, onSubmit }) => {
  const [formData, setFormData] = useState<FormDataValues>({
    title: initialData?.title || "",
    summary: initialData?.summary || "",
    content: initialData?.content || "",
    category_id: initialData?.category_id || "",
    topics: initialData?.topics || [],
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTopicChange = (selectedTopics: (string | number)[]) => {
    setFormData((prev) => ({ ...prev, topics: selectedTopics.map(String) }));
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
    data.append("summary", formData.summary);
    data.append("content", formData.content);
    data.append("category_id", formData.category_id);
    formData.topics.forEach((topic) => {
      data.append("topics[]", topic);
    });
    if (selectedImage) data.append("image", selectedImage);
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
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
        label="Resumo"
        value={formData.summary}
        onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
        required
        maxLength={255}
        disabled={isSubmitting}
      />

      <CustomTextAreaInput
        label="Conteúdo"
        value={formData.content}
        onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
        required
        rows={8}
        disabled={isSubmitting}
      />

      <CustomInputSelect
        label="Categoria"
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        value={formData.category_id}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            category_id: e.target.value,
          }))
        }
        placeholder="Selecione uma categoria"
        disabled={isSubmitting}
        required
      />

      <div>
        <label className={`${Typography.h6} mb-4`} style={{ color: txtColors.gray500 }}>
          Tópicos
        </label>
        <CustomCheckboxInput
          options={topics.map((topic) => ({
            id: topic.id,
            label: topic.name,
          }))}
          selected={formData.topics}
          onChange={handleTopicChange}
          variant="grid"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className={`${Typography.h6} mb-4`} style={{ color: txtColors.gray500 }}>
          Imagem do Post
        </label>
        <div className="flex flex-col items-center gap-6">
          {previewImage && (
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-[300px] h-[200px] rounded-md shadow-md overflow-hidden">
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={300}
                  height={200}
                  className="object-cover rounded-md hover:opacity-80 transition-all"
                />
              </div>
            </div>
          )}

          <FilledButton
            text={previewImage ? "Alterar Imagem" : "Selecionar Arquivo"}
            onClick={() => fileInputRef.current?.click()}
            disabled={isSubmitting}
            color="bg-white"
            className={`px-6 py-2 ${Typography.button}`}
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

      <div className="flex justify-end">
        <FilledButton
          text={isSubmitting ? "Salvando..." : "Salvar"}
          type="submit"
          disabled={isSubmitting}
          color="bg-blue-600"
          className={`${Typography.button} text-white hover:bg-blue-700`}
        />
      </div>
    </form>
  );
};
