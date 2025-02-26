"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AuthService } from "../../services/authService";
import routes from "../../routes/routes";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get token and email from URL params
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    console.log('Token:', token);
    console.log('Email:', email);

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
    <div className="min-h-screen flex items-center justify-center">
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
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Nova Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
                required
                minLength={8}
                disabled={loading}
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-medium text-gray-700"
              >
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
                required
                minLength={8}
                disabled={loading}
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-black bg-yellow-500 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? "Redefinindo..." : "Redefinir Senha"}
          </button>
        </form>

        <div className="text-lg text-center">
          <p className="text-gray-400">
            Não solicitou redefinição?{" "}
            <a href={routes.auth.login} className="text-black hover:underline">
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}