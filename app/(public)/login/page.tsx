"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import FilledButton from "@/components/Buttons/FilledButton";
import TextButton from "@/components/Buttons/TextButton";
import CustomTextInput, { InputType } from "@/components/Inputs/CustomTextInput";
import { txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { AuthService } from "@/services/authService";
import clsx from "clsx";
import toast from "react-hot-toast";
import routes from "@/routes/routes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  interface ErrorResponse {
    response?: {
      data?: {
        message?: string;
      };
    };
    request?: unknown;
  }

  const extractErrorMessage = (err: unknown): string => {
    if (err instanceof Error) return err.message;
    const error = err as ErrorResponse;
    if (error.response?.data?.message) return error.response.data.message;
    if (error.request) return "Erro de rede. Verifique sua conexão com a internet.";
    return "Falha no login. Verifique suas credenciais.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      await AuthService.login(email, password);
      // if (success) {
      //   router.replace("/");
      // }
    } catch (err: unknown) {
      const errorMessage = extractErrorMessage(err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-6 sm:p-8 space-y-8 bg-white rounded-xl shadow-2xl mx-4">
        <div className="text-left space-y-2">
          <h1 className={clsx(Typography.Headline)}>Bem-vindo!</h1>
          <p className={clsx(Typography.Subtitle, txtColors.gray700)}>
            Ainda não possui conta?{" "}
            <TextButton
              href={routes.auth.register}
              text="Cadastre-se aqui"
            />
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <CustomTextInput
              id="email"
              type={InputType.Email}
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoComplete="email"
            />
            <CustomTextInput
              id="password"
              type={InputType.Password}
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              autoComplete="current-password"
            />
            <div className="text-right">
              <TextButton
                href={routes.auth.forgotPassword}
                text="Esqueceu sua senha?"
                fontColor={txtColors.gray700}
              />
            </div>
          </div>
          <FilledButton
            text="Entrar"
            disabled={loading}
            className="w-full"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
