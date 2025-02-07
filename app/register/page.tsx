"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "../../services/userService";

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
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const success = await createUser(formData);

      if (success) {
        router.push("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Crie sua conta
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">
            Já possui conta?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Faça seu login
            </a>
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {[
              { id: "name", label: "Nome", type: "text" },
              { id: "email", label: "Email", type: "email" },
              { id: "phone", label: "Telefone", type: "tel" },
              { id: "birthdate", label: "Data de Nascimento", type: "date" },
              { id: "password", label: "Senha", type: "password" },
              {
                id: "confirmPassword",
                label: "Confirmar Senha",
                type: "password",
              },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all"
                  required
                  minLength={field.type === "password" ? 6 : undefined}
                  maxLength={field.id === "phone" ? 15 : undefined}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Cadastrando...
              </span>
            ) : (
              "Cadastrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
