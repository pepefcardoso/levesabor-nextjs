"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PostCategory, PostTopic } from "../../typings/post";

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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          maxLength={100}
          disabled={isSubmitting}
          className="w-full border rounded-md px-4 py-2"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Resumo</label>
        <textarea
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          required
          maxLength={255}
          disabled={isSubmitting}
          className="w-full border rounded-md px-4 py-2"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          className="w-full h-48 border rounded-md px-4 py-2"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Categoria</label>
        <select
          value={formData.category_id}
          onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
          disabled={isSubmitting}
          className="w-full border rounded-md px-4 py-2"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-4">
          Tópicos
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {topics.map((topics) => (
            <label
              key={topics.id}
              className={`
                  relative flex items-center p-3 border rounded-lg cursor-pointer
                  transition-all duration-200
                  ${formData.topics.includes(topics.id)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
                }
                `}
            >
              <input
                type="checkbox"
                value={topics.id}
                checked={formData.topics.includes(topics.id)}
                onChange={(e) => handleTopicChange(topics.id, e.target.checked)}
                className="hidden"
                disabled={isSubmitting}
              />
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center
                    ${formData.topics.includes(topics.id)
                      ? "bg-blue-500 border-blue-500"
                      : "bg-white border-gray-300"
                    }`}
                >
                  {formData.topics.includes(topics.id) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-gray-700 text-sm">{topics.name}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-4">
          Imagem do Post
        </label>
        <div className="flex flex-col items-center gap-6">
          {previewImage ? (
            <div className="relative group">
              <Image
                src={previewImage}
                alt="Preview"
                width={300}
                height={200}
                className="rounded-lg object-cover shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Alterar Imagem
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md p-8 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Arraste ou clique para fazer upload
              </p>
            </div>
          )}

          <label className="inline-flex items-center px-6 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
              disabled={isSubmitting}
            />
            <svg
              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            {previewImage ? "Alterar Imagem" : "Selecionar Arquivo"}
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
};
