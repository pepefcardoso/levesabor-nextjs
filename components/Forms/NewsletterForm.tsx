"use client";

import { txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { createNewsletterCustomer } from "@/services/NewsletterCustomerService";
import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import CustomTextInput, { InputType } from "../Inputs/CustomTextInput";
import FilledIconButton from "../Buttons/FilledIconButton";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      await createNewsletterCustomer(formData);
      setEmail("");
      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      let errorMessage = "Erro ao cadastrar. Tente novamente.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className={clsx(Typography.Title, "mb-2")}>Nossa newsletter</h2>
      <p className={clsx(Typography.Body, txtColors.gray500, "mb-6")}>
        Cadastre-se e não perca nenhuma novidade
      </p>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <CustomTextInput
          type={InputType.Email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
          required
          className="flex-1"
        />
        <FilledIconButton
          disabled={submitting}
          type="submit"
        />
      </form>
    </div>
  );
};

export default NewsletterForm;
