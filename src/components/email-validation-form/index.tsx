import React, { useState } from "react";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "ui/text-field";
import { ParagraphText } from "ui/texts";
import { SendButton } from "ui/buttons";
import { useEmailValidation, setUserDataAtom } from "hooks";

export function EmailValidationForm() {
  const navigate = useNavigate();
  const setUserData = setUserDataAtom();
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const response = await useEmailValidation(email);
    if (response) {
      setUserData((userData) => {
        return { ...userData, email };
      });
    } else if (response.error) {
      alert(response);
    } else if (!response) {
      setUserData((userData) => {
        return { ...userData, email };
      });
      //si la response = false, significa que el user no esta en la base de datos y lx manda para la página de registro
      navigate("/registration");
    }
  }
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <ParagraphText>Email:</ParagraphText>
      <TextField name="email" type="email" placeholder="your_email@example.com" />
      <SendButton>Enviar</SendButton>
    </form>
  );
}
