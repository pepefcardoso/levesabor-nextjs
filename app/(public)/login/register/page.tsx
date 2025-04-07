"use client";

import TextButton from "@/components/Buttons/TextButton";
import RegisterUserForm from "@/components/Forms/RegisterUserForm";
import { txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { userService } from "@/services/index";
import routes from "../../../../routes/routes";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setLoading(true);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key as keyof typeof formData]);
    });

    try {
      const success = await userService.create(form);

      if (success) {
        toast.success("Cadastro realizado com sucesso!");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        toast.error("Falha no cadastro. Tente novamente.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ocorreu um erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg p-6 sm:p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <div className="text-left space-y-2">
          <h1 className={clsx(Typography.Headline)}>Crie sua conta</h1>
          <p className={clsx(Typography.Subtitle, txtColors.gray700)}>
            Já possui conta?{" "}
            <TextButton
              href={routes.auth.login}
              text="Faça seu login"
            />
          </p>
        </div>
        <RegisterUserForm
          formData={formData}
          loading={loading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
