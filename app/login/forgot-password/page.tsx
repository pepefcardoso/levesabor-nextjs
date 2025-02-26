"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthService } from "../../../services/authService";

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
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
                required
                disabled={loading}
                autoComplete="email"
                placeholder="Digite seu e-mail"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-black bg-yellow-500 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? "Enviando..." : "Enviar link de redefinição"}
          </button>
        </form>

        <div className="text-lg text-center">
          <p className="text-gray-400">
            Lembrou sua senha?{" "}
            <a href="/login" className="text-black hover:underline">
              Faça login aqui
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
