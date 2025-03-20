"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FilledButton from "@/components/Buttons/FilledButton";
import TextButton from "@/components/Buttons/TextButton";
import CustomTextInput, { InputType } from "@/components/Inputs/CustomTextInput";
import { txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { AuthService } from "@/services/authService";
import { ButtonTypes, FilledButtonHovers, TextButtonHovers } from "@/typings/buttons";
import clsx from "clsx";
import routes from "routes/routes";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      toast.error("Link de redefinição inválido ou expirado.");
      router.push("/login/forgot-password");
    }
  }, [token, email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !token || !email) return;

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setLoading(true);

    try {
      await AuthService.resetPassword(token, email, password, confirmPassword);
      toast.success("Senha redefinida com sucesso!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Falha ao redefinir a senha. Tente novamente.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full p-6 sm:p-8 space-y-8 bg-white rounded-xl shadow-2xl mx-4">
        <div className="text-left">
          <h1 className={clsx(Typography.Headline, "mb-4")}>Nova Senha</h1>
          <p className={clsx(Typography.Subtitle, txtColors.gray800)}>Digite sua nova senha para {email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <CustomTextInput
              type={InputType.Password}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              minLength={8}
              autoComplete="new-password"
              placeholder="••••••••"
              label="Nova Senha"
            />
            <CustomTextInput
              type={InputType.Password}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              minLength={8}
              autoComplete="new-password"
              placeholder="••••••••"
              label="Confirmar Senha"
            />
          </div>

          <FilledButton
            text={"Redefinir Senha"}
            type={ButtonTypes.submit}
            disabled={loading}
            hoverAnimation={FilledButtonHovers.opacity}
            className="w-full"
          />
        </form>

        <p className={clsx(Typography.Body, txtColors.gray800, "text-center")}>
          Não solicitou redefinição?{" "}
          <TextButton text="Entre em contato" href={routes.contact} hoverAnimation={TextButtonHovers.bold} />
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordWithSuspense() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
