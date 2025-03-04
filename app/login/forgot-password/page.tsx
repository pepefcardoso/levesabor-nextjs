"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthService } from "../../../services/authService";
import routes from "../../../routes/routes";
import CustomTextInput, { InputType } from "../../../components/Inputs/CustomTextInput";
import FilledButton from "../../../components/Buttons/FilledButton";
import TextButton from "../../../components/Buttons/TextButton";
import { bgColors, txtColors } from "../../../constants/colors";
import { ButtonTypes, TextButtonHovers } from "../../../typings/buttons";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      await AuthService.forgotPassword(email);
      toast.success(
        "Um e-mail foi enviado com instruções para redefinir sua senha!",
        {
          position: "bottom-left",
        }
      );
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Falha ao enviar o link de redefinição. Tente novamente.";
      toast.error(errorMessage, {
        position: "bottom-left",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Redefinir Senha
          </h1>
          <p className="text-gray-400 text-lg">
            Digite seu endereço de e-mail e enviaremos um link para redefinir
            sua senha.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                E-mail
              </label>
              <CustomTextInput
                type={InputType.Email}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
                placeholder="Digite seu e-mail"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <FilledButton
              type={ButtonTypes.submit}
              text="Enviar link de redefinição"
              disabled={loading}
              color={bgColors.tertiary}
            />
          </div>
        </form>

        <div className="text-lg text-center">
          <p className="text-gray-400">
            Lembrou sua senha?{" "}
            <TextButton
              href={routes.auth.login}
              text="Faça login aqui"
              color={txtColors.gray800}
              hoverAnimation={TextButtonHovers.bold}
            />
          </p>
        </div>
      </div>
    </div>
  );
}