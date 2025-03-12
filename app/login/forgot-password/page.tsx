"use client";

import FilledButton from "@/components/Buttons/FilledButton";
import TextButton from "@/components/Buttons/TextButton";
import CustomTextInput, { InputType } from "@/components/Inputs/CustomTextInput";
import { txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { AuthService } from "@/services/authService";
import { ButtonTypes, FilledButtonHovers, TextButtonHovers } from "@/typings/buttons";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import routes from "routes/routes";

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
      toast.success("Um e-mail foi enviado com instruções para redefinir sua senha!", {
        position: "bottom-left",
      });
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Tente novamente.";
      toast.error(errorMessage, {
        position: "bottom-left",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full p-8 mx-4 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-left">
          <h1 className={clsx(Typography.Title, "mb-2")}>Redefinir Senha</h1>
          <p className={clsx(Typography.Body, txtColors.gray500)}>
            Digite seu endereço de e-mail e enviaremos um link para redefinir sua senha.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <CustomTextInput
                type={InputType.Email}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
                placeholder="Digite seu e-mail"
                label="Email"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <FilledButton
              type={ButtonTypes.submit}
              text="Enviar link de redefinição"
              disabled={loading}
              className="w-full"
              hoverAnimation={FilledButtonHovers.opacity}
            />
          </div>
        </form>

        <div className="text-lg text-left">
          <p className={clsx(Typography.Body, txtColors.gray500)}>
            Lembrou sua senha?{" "}
            <TextButton
              href={routes.auth.login}
              text="Faça login aqui"
              color={txtColors.black}
              typography={clsx(Typography.Body)}
              hoverAnimation={TextButtonHovers.bold}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
