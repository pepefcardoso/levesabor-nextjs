import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { sanitizeImageUrl } from "../../tools/helper";
import CustomImage from "../Others/CustomImage";
import CustomTextInput, { InputType } from "../Inputs/CustomTextInput";
import FilledButton from "../Buttons/FilledButton";

type UserProfileFormProps = {
  initialData: {
    name: string;
    birthday: string;
    phone: string;
    email: string;
    image?: { url: string };
  };
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting?: boolean;
};

export const UserProfileForm = ({
  initialData,
  onSubmit,
  isSubmitting,
}: UserProfileFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    birthday: "",
    phone: "",
  });

  useEffect(() => {
    setFormValues({
      name: initialData.name,
      birthday: initialData.birthday?.split("T")[0] || "",
      phone: initialData.phone || "",
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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-8 px-4 sm:px-0"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="relative group">
          <div className="w-48 h-48 rounded-full ring-4 ring-white shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <CustomImage
              src={previewImage || sanitizeImageUrl(initialData.image?.url)}
              alt="Perfil"
              width={192}
              height={192}
              rounded="full"
              objectFit="cover"
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          <label className="block mt-4 text-center">
            <span className="px-6 py-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors duration-300 text-sm font-medium">
              Alterar Foto
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isSubmitting}
              />
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Nome
            </label>
            <CustomTextInput
              name="name"
              value={formValues.name}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nome"
              disabled={isSubmitting}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              E-mail
            </label>
            <CustomTextInput
              name="email"
              value={initialData.email}
              placeholder="E-mail"
              disabled
              className="w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Data de Nascimento
            </label>
            <CustomTextInput
              type={InputType.Date}
              name="birthday"
              value={formValues.birthday}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, birthday: e.target.value }))
              }
              placeholder="Data de Nascimento"
              disabled={isSubmitting}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Telefone
            </label>
            <CustomTextInput
              name="phone"
              value={formValues.phone}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="Telefone"
              disabled={isSubmitting}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <FilledButton
          type="submit"
          text="Salvar"
          color="bg-yellow-400"
          fontColor="text-black"
          className="px-8 py-3 rounded-lg hover:bg-yellow-500 shadow-lg font-medium text-base"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};