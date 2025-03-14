"use client";

import FilledButton from "@/components/Buttons/FilledButton";
import IconButton from "@/components/Buttons/IconButton";
import { UserProfileForm } from "@/components/Forms/UserProfileForm";
import { UserProfileSkeleton } from "@/components/Skeletons/UserProfileSkeleton";
import { txtColors } from "@/constants/colors";
import { deleteUser, getCurrentUser, updateUser } from "@/services/userService";
import { User } from "@/typings/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

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
            <IconButton
              onClick={() => setShowDeleteDialog(true)}
              ariaLabel="Excluir conta"
              className="absolute top-6 right-6 text-red-600 hover:text-red-700"
              Icon={FaTrash}
            />

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

        <dialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          className="bg-white rounded-lg p-6 max-w-md mx-auto z-50"
        >
          <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão</h2>
          <p className="mb-6 text-lg text-gray-600">
            Tem certeza que deseja excluir sua conta permanentemente?
          </p>
          <div className="flex justify-end gap-4">
            <FilledButton
              text="Cancelar"
              onClick={() => setShowDeleteDialog(false)}
              type="button"
              color="bg-white"
              fontColor={txtColors.gray800}
            />
            <FilledButton
              text="Confirmar"
              onClick={handleDelete}
              type="button"
              color="bg-red-600"
              fontColor={txtColors.white}
            />
          </div>
        </dialog>
      </div>
    </div>
  );
}
