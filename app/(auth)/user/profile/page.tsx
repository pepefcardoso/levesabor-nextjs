"use client";

import IconButton from "@/components/Buttons/IconButton";
import TextButton from "@/components/Buttons/TextButton";
import { UserProfileForm } from "@/components/Forms/UserProfileForm";
import EmptyList from "@/components/Others/EmptyList";
import { FormSkeleton } from "@/components/Skeletons/FormSkeleton";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { iconColors, txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { User } from "@/typings/user";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationTriangle, FaTrash } from "react-icons/fa";
import useAuthStore from "../../../../store/authStore";
import { userService } from "@/services/index";

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
        const userData = await userService.getCurrent();
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
      const updatedUser = await userService.update(user.id, formData);
      setUser(updatedUser);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Falha ao atualizar perfil";
      toast.error(errorMessage);
      return Promise.reject(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!user) return;
      await userService.delete(user.id);
      useAuthStore.getState().logout();
      router.push("/");
    } catch {
      toast.error("Falha ao excluir conta");
      setShowDeleteDialog(false);
    }
  };

  if (loading) return <PageSkeleton />;
  if (!user || fetchError) {
    return (
      <div className="min-h-screen mx-auto flex items-center justify-center">
        <EmptyList
          title="Por favor, tente novamente"
          description="Ocorreu um erro ao carregar o perfil do usuário"
          Icon={FaExclamationTriangle}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {isSubmitting ? (
        <FormSkeleton />
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h1 className={clsx(Typography.Headline)}>Meu Perfil</h1>
            <IconButton
              onClick={() => {
                console.log("IconButton clicked");
                setShowDeleteDialog(true);
              }}
              Icon={FaTrash}
              color={iconColors.red}
            />
          </div>

          <UserProfileForm initialData={user} onSubmit={handleUpdateProfile} isSubmitting={isSubmitting} />

          {showDeleteDialog && (
            <div
              className={clsx(
                "absolute inset-0 flex items-center px-4 justify-center bg-black bg-opacity-50 rounded-2xl transition-opacity duration-300"
              )}
            >
              <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
                <h2 className={clsx(Typography.Subtitle, "mb-4")}>Confirmar Exclusão</h2>
                <p className={clsx(Typography.Body, txtColors.gray500, "mb-6")}>
                  Tem certeza que deseja excluir sua conta permanentemente?
                </p>
                <div className="flex justify-end gap-4">
                  <TextButton text="Cancelar" onClick={() => setShowDeleteDialog(false)} fontColor={txtColors.gray500} />
                  <TextButton
                    text="Confirmar"
                    onClick={handleDelete}
                    fontColor={txtColors.black}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
