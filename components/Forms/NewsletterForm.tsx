"use client";

import { createNewsletterCustomer } from "@/services/NewsletterCustomerService";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import CustomTextInput, { InputType } from "../Inputs/CustomTextInput";
import FilledButton from "../Buttons/FilledButton";
import { bgColors, txtColors } from "@/constants/colors";
import { FilledButtonHovers } from "@/typings/buttons";
import { Typography } from "@/constants/typography";
import clsx from "clsx";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      await createNewsletterCustomer(formData);
      setEmail("");
      toast.success("Cadastro realizado com sucesso!", { position: "bottom-left" });
    } catch (error) {
      let errorMessage = "Erro ao cadastrar. Tente novamente.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage, { position: "bottom-left" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className={clsx(Typography.Title2, txtColors.black, "mb-2 text-left")}>Nossa newsletter</h2>
      <p className={clsx(Typography.Body2, txtColors.gray500, "mb-6")}>Cadastre-se e não perca nenhuma novidade</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
        <CustomTextInput
          type={InputType.Email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
          required
        />
        <FilledButton
          type="submit"
          text="Cadastrar"
          color={bgColors.tertiary}
          hoverAnimation={FilledButtonHovers.opacity}
        />
      </form>
    </div>
  );
};

export default NewsletterForm;
