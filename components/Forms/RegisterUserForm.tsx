"use client";

import { FormEvent } from "react";
import CustomTextInput, { InputType } from "../Inputs/CustomTextInput";
import CustomBackgroundTextButton from "../Buttons/CustomBackgroundTextButton";

interface RegisterUserFormProps {
    formData: {
        name: string;
        email: string;
        phone: string;
        birthdate: string;
        password: string;
        confirmPassword: string;
    };
    loading: boolean;
    error: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent) => Promise<void>;
}

const RegisterUserForm = ({
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
}: RegisterUserFormProps) => {
    const formFields = [
        { id: "name", label: "Nome", type: InputType.Text },
        { id: "email", label: "Email", type: InputType.Email },
        { id: "phone", label: "Telefone", type: InputType.Tel, maxLength: 15 },
        { id: "birthdate", label: "Data de Nascimento", type: InputType.Date },
        { id: "password", label: "Senha", type: InputType.Password, minLength: 6 },
        {
            id: "confirmPassword",
            label: "Confirmar Senha",
            type: InputType.Password,
            minLength: 6,
        },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center">
                    <span className="flex-1">{error}</span>
                </div>
            )}

            <div className="grid gap-4">
                {formFields.map((field) => (
                    <CustomTextInput
                        key={field.id}
                        id={field.id}
                        type={field.type}
                        label={field.label}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        minLength={field.minLength}
                        maxLength={field.maxLength}
                    />
                ))}
            </div>

            <CustomBackgroundTextButton
                type="submit"
                text="Cadastrar"
                loading={loading}
                loadingText="Cadastrando..."
                backgroundColor="bg-yellow-500"
            />
        </form>
    );
};

export default RegisterUserForm;