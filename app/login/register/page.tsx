"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "../../../services/userService";
import toast, { Toaster } from "react-hot-toast";
import routes from "../../../routes/routes";
import TextButton from "../../../components/Buttons/TextButton";
import RegisterUserForm from "../../../components/Forms/RegisterUserForm";

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
  const [error, setError] = useState("");
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
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    setError("");

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key as keyof typeof formData]);
    });

    try {
      const success = await createUser(form);

      if (success) {
        toast.success("Cadastro realizado com sucesso!");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setError("Falha no cadastro. Tente novamente.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro inesperado"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6"> {/* Removed bg-white class from outer container */}
      <Toaster position="bottom-left" />
      <div className="w-full max-w-lg p-6 sm:p-8 space-y-6 bg-white rounded-xl shadow-2xl"> {/* Added bg-white for the card */}
        <div className="text-left space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Crie sua conta
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">
            Já possui conta?{" "}
            <TextButton
              href={routes.auth.login}
              text="Faça seu login"
              fontColor="black"
            />
          </p>
        </div>

        <RegisterUserForm
          formData={formData}
          loading={loading}
          error={error}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

