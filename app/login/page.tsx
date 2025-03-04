"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthService } from "../../services/authService";
import routes from "../../routes/routes";
import { LoginSkeleton } from "../../components/Skeletons/LoginFormSkeleton";
import CustomTextInput, { InputType } from "../../components/Inputs/CustomTextInput";
import FilledButton from "../../components/Buttons/FilledButton";
import TextButton from "../../components/Buttons/TextButton";
import { bgColors, txtColors } from "../../constants/colors";
import { TextButtonHovers } from "../../typings/buttons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const success = await AuthService.login(email, password);
      if (success) {
        router.push("/");
      }
    } catch (err: unknown) {
      let errorMessage = "Falha no login. Verifique suas credenciais.";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof err.response === "object" &&
        err.response !== null &&
        "data" in err.response &&
        typeof err.response.data === "object" &&
        err.response.data !== null &&
        "message" in err.response.data
      ) {
        errorMessage = err.response.data.message as string;
      } else if (typeof err === "object" && err !== null && "request" in err) {
        errorMessage = "Erro de rede. Verifique sua conexão com a internet.";
      }

      toast.error(errorMessage, {
        position: "bottom-left",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <LoginSkeleton />
      ) : (
        <div className="w-full max-w-lg p-6 sm:p-8 space-y-8 bg-white rounded-xl shadow-2xl">
          <div className="text-left space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Bem-vindo!
            </h1>
            <p className="text-gray-500 text-base sm:text-lg">
              Ainda não possui conta?{" "}
              <TextButton
                href={routes.auth.register}
                text="Cadastre-se aqui"
                color={txtColors.white}
                hoverAnimation={TextButtonHovers.bold}
              />
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            </div>
            <div className="text-right">
              <TextButton
                href={routes.auth.forgotPassword}
                text="Esqueceu sua senha?"
              />
            </div>
            <FilledButton
              text="Entrar"
              disabled={loading}
              color={bgColors.tertiary}
            />
          </form>
        </div>
      )}
    </div>
  );
}