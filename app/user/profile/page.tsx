"use client";

import React, { useEffect, useState } from "react";
import { getCurrentUser, updateUser, deleteUser } from "../../../services/userService";
import EmptyList from "../../../components/EmptyList";
import { User } from "../../../typings/api";
import { sanitizeImageUrl } from "../../../tools/helper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserProfileSkeleton } from "../../../components/UserProfileSkeleton";

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        setError("Falha ao carregar perfil");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user) return;

    try {
      const formData = new FormData(e.currentTarget);
      const updatedUser = await updateUser(user.id, formData);
      setUser(updatedUser);
      setSuccess("Perfil atualizado com sucesso!");
    } catch (err) {
      setError("Falha ao atualizar perfil");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      if (!user) return;
      await deleteUser(user.id);
      router.push("/");
    } catch (err) {
      setError("Falha ao excluir conta");
      console.error(err);
      setShowDeleteDialog(false);
    }
  };

  if (loading) return <UserProfileSkeleton />;
  if (!user) return <EmptyList message="Usuário não encontrado" />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 relative">
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="absolute top-6 right-6 text-red-600 hover:text-red-700"
          aria-label="Excluir conta"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Meu Perfil</h1>

        {error && (
          <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 text-green-700 bg-green-100 rounded-md">
            {success}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
            <div className="w-48 h-48 rounded-lg overflow-hidden mx-auto mb-6">
              <Image
                src={sanitizeImageUrl(user.image?.url)}
                alt="Perfil"
                width={192}
                height={192}
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </div>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-2/3 space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  name="name"
                  defaultValue={user.name}
                  className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Email
                </label>
                <p className="px-5 py-3 text-lg text-gray-900 bg-gray-50 rounded-md">
                  {user.email}
                </p>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  name="birthday"
                  defaultValue={user.birthday?.split("T")[0] || ""}
                  className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  name="phone"
                  defaultValue={user.phone || ""}
                  className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg transition-colors"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Confirmar Exclusão</h3>
            <p className="mb-6 text-lg text-gray-600">
              Tem certeza que deseja excluir sua conta permanentemente?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-lg"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}