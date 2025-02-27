"use client";

import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  updateUser,
  deleteUser,
} from "../../../services/userService";
import { useRouter } from "next/navigation";
import { UserProfileSkeleton } from "../../../components/Skeletons/UserProfileSkeleton";
import toast from "react-hot-toast";
import { UserProfileForm } from "../../../components/Forms/UserProfileForm";
import { User } from "../../../typings/user";

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setFetchError(false);
      } catch {
        setFetchError(true);
        toast.error("Por favor, recarregue a página");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (!user) return;
      const updatedUser = await updateUser(user.id, formData);
      setUser(updatedUser);
      toast.success("✅ Perfil atualizado com sucesso!");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Falha ao atualizar perfil";
      toast.error(`❌ ${errorMessage}`);
      return Promise.reject(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!user) return;
      await deleteUser(user.id);
      router.push("/");
    } catch {
      toast.error("Falha ao excluir conta");
      setShowDeleteDialog(false);
    }
  };

  if (loading || fetchError) return <UserProfileSkeleton />;
  if (!user)
    return <div className="text-center py-20">Usuário não encontrado</div>;

  return (
    <div className="min-h-[85vh] bg-gray-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {isSubmitting ? (
          <UserProfileSkeleton />
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 relative">
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

            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Meu Perfil
            </h1>

            <UserProfileForm
              initialData={user}
              onSubmit={handleUpdateProfile}
              isSubmitting={isSubmitting}
            />
          </div>
        )}

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
    </div>
  );
}
