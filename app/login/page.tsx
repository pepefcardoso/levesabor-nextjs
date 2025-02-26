"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthService } from "../../services/authService";

export function LoginSkeleton() {
  return (
    <div className="max-w-lg w-full p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <div className="text-left">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>
      <div className="space-y-8">
        <div className="space-y-6">
          <div>
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
          <div>
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/3 ml-auto animate-pulse" />
        </div>
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

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
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      {loading ? (
        <LoginSkeleton />
      ) : (
        <div className="max-w-lg w-full p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bem-vindo!
            </h1>
            <p className="text-gray-400 text-lg">
              Ainda não possui conta?{" "}
              <a href="/login/register" className="text-black hover:underline">
                Cadastre-se aqui
              </a>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-700"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 block w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>
              <div className="text-lg text-right">
                <a
                  href="/login/forgot-password"
                  className="text-black hover:underline"
                >
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-black bg-yellow-500 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? "Carregando..." : "Entrar"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
