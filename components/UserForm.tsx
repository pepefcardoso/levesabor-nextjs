import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { sanitizeImageUrl } from "../tools/helper";

type UserFormProps = {
    initialData: {
        name: string
        birthday: string
        phone: string
        email: string // Adicionando o e-mail
        image?: { url: string }
    }
    onSubmit: (formData: FormData) => Promise<void>
    isSubmitting?: boolean
}

export const UserForm = ({
    initialData,
    onSubmit,
    isSubmitting
}: UserFormProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [formValues, setFormValues] = useState({
        name: '',
        birthday: '',
        phone: ''
    });

    useEffect(() => {
        setFormValues({
            name: initialData.name,
            birthday: initialData.birthday?.split("T")[0] || '',
            phone: initialData.phone || ''
        });
    }, [initialData]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 space-y-8">
            <div className="w-full md:w-1/3">
                <div className="w-48 h-48 rounded-lg overflow-hidden mx-auto mb-6">
                    <Image
                        src={previewImage || sanitizeImageUrl(initialData.image?.url)}
                        alt="Perfil"
                        width={192}
                        height={192}
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, 192px"
                    />
                </div>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Nome</label>
                    <input
                        name="name"
                        value={formValues.name}
                        onChange={(e) => setFormValues(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">E-mail</label>
                    <input
                        name="email"
                        value={initialData.email}
                        className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-100 cursor-not-allowed"
                        disabled
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Data de Nascimento</label>
                    <input
                        type="date"
                        name="birthday"
                        value={formValues.birthday}
                        onChange={(e) => setFormValues(prev => ({ ...prev, birthday: e.target.value }))}
                        className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Telefone</label>
                    <input
                        name="phone"
                        value={formValues.phone}
                        onChange={(e) => setFormValues(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-5 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-8 py-3 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-shadow shadow-md text-lg"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Salvando..." : "Salvar"}
                </button>
            </div>
        </form>
    );
};