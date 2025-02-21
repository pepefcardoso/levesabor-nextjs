"use client";
import React, { useState } from "react";
import Image from "next/image";
import { PostCategory, PostTopic } from "../typings/api";

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

export const PostForm: React.FC<PostFormProps> = ({
  initialData,
  categories,
  topics,
  isSubmitting,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormDataValues>({
    title: initialData?.title || "",
    summary: initialData?.summary || "",
    content: initialData?.content || "",
    category_id: initialData?.category_id || "",
    topics: initialData?.topics || [],
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleTopicChange = (topicId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      topics: checked
        ? [...prev.topics, topicId]
        : prev.topics.filter((id) => id !== topicId),
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
          maxLength={100}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Resumo
        </label>
        <textarea
          value={formData.summary}
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
          className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          required
          maxLength={255}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Conteúdo
        </label>
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg h-64 disabled:opacity-50 disabled:cursor-not-allowed"
          required
          disabled={isSubmitting}
        />
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
          Tópicos
        </label>
        <div className="flex flex-wrap gap-4">
          {topics.map((topic) => (
            <label key={topic.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={topic.id}
                checked={formData.topics.includes(topic.id)}
                onChange={(e) => handleTopicChange(topic.id, e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              />
              <span className="text-gray-700">{topic.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Imagem de Destaque
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
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
};