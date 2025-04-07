import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import CustomTextInput, { InputType } from "../Inputs/CustomTextInput";
import FilledButton from "../Buttons/FilledButton";
import IconButton from "../Buttons/IconButton";
import { FiEdit2 } from "react-icons/fi";
import TextButton from "../Buttons/TextButton";
import { txtColors } from "@/constants/colors";
import { sanitizeImageUrl } from "../../tools/helper";
import routes from "../../routes/routes";

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

export const UserProfileForm = ({ initialData, onSubmit, isSubmitting }: UserProfileFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-8 px-4 sm:px-0">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-48 h-48">
          <Image
            src={previewImage || sanitizeImageUrl(initialData.image?.url)}
            alt="Perfil"
            width={192}
            height={192}
            className="rounded-full border-4 border-primary object-cover w-full h-full shadow-lg"
          />
          <div className="absolute bottom-2 right-2">
            <IconButton
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              Icon={FiEdit2}
              className="bg-white rounded-full shadow-md border-2 border-tertiary"
            />
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isSubmitting}
            ref={fileInputRef}
          />
        </div>
      </div>

      <div className="space-y-6">
        <CustomTextInput
          label="Nome"
          name="name"
          value={formValues.name}
          onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Nome"
          disabled={isSubmitting}
        />

        <CustomTextInput
          name="email"
          label="E-mail"
          value={initialData.email}
          placeholder="E-mail"
          disabled
          className="bg-gray-100"
        />

        <CustomTextInput
          label="Data de Nascimento"
          type={InputType.Date}
          name="birthday"
          value={formValues.birthday}
          onChange={(e) => setFormValues((prev) => ({ ...prev, birthday: e.target.value }))}
          placeholder="Data de Nascimento"
          disabled={isSubmitting}
        />

        <CustomTextInput
          name="phone"
          label="Telefone"
          value={formValues.phone}
          onChange={(e) => setFormValues((prev) => ({ ...prev, phone: e.target.value }))}
          placeholder="Telefone"
          disabled={isSubmitting}
          type={InputType.Tel}
        />
      </div>

      <div className="flex justify-end items-center gap-8">
        <TextButton
          href={routes.home}
          text="Voltar"
          disabled={isSubmitting}
          fontColor={txtColors.gray700}
        />
        <FilledButton
          type="submit"
          text="Salvar"
          disabled={isSubmitting}
          className="px-8"
        />
      </div>
    </form>
  );
};
