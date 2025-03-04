"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AuthService } from "../../services/authService";
import routes from "../../routes/routes";
import TextButton from "../../components/Buttons/TextButton";
import FilledButton from "../../components/Buttons/FilledButton";
import CustomTextInput, { InputType } from "../../components/Inputs/CustomTextInput";
import { ButtonTypes, TextButtonHovers } from "../../typings/buttons";
import { bgColors } from "../../constants/colors";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      toast.error("Link de redefinição inválido ou expirado.", {
        position: "bottom-left",
      });
      router.push("/login/forgot-password");
    }
  }, [token, email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !token || !email) return;

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem", { position: "bottom-left" });
      return;
    }

    setLoading(true);

    try {
      await AuthService.resetPassword(token, email, password, confirmPassword);
      toast.success("Senha redefinida com sucesso!", {
        position: "bottom-left",
      });
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Falha ao redefinir a senha. Tente novamente.";
      toast.error(errorMessage, {
        position: "bottom-left",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nova Senha
          </h1>
          <p className="text-gray-400 text-lg">
            Digite sua nova senha para {email}
          </p>
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
            text={loading ? "Redefinindo..." : "Redefinir Senha"}
            type={ButtonTypes.submit}
            disabled={loading}
            color={bgColors.tertiary}
          />
        </form>

        <div className="text-lg text-center">
          <p className="text-gray-400">
            Não solicitou redefinição?{" "}
            <TextButton
              text="Entre em contato"
              href={routes.auth.login}
              hoverAnimation={TextButtonHovers.bold}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
