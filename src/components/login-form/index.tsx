import React, { useEffect, useState } from "react";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "ui/text-field";
import { ParagraphText } from "ui/texts";
import { MainButton } from "ui/buttons";
import { useLogin, useUserDataAtom, useGetUserProfileInfo } from "hooks";

export function LoginValidationForm() {
  const navigate = useNavigate();
  const [userData, setUserData] = useUserDataAtom();

  function handleClick() {
    setUserData((lastData) => {
      return { ...lastData, email: null };
    });
    location.reload();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const password = e.target.password.value;
    const { email } = userData;
    const response = await useLogin(email, password);
    if (response.error) {
      alert(response.error);
    } else {
      const from = localStorage.getItem("from") || "/";
      const userInfo = await useGetUserProfileInfo(response.token);
      setUserData({ name: userInfo.fullName, email, token: response.token, isLogged: response.access, userId: userInfo.id });
      navigate(from);
    }
  }
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <ParagraphText>Tu mail actual es: {userData.email}</ParagraphText>
      <p className={css.mailChanger} onClick={handleClick}>
        No soy {userData.email}
      </p>
      <ParagraphText>Password:</ParagraphText>
      <TextField name="password" type="password" placeholder="your_email@example.com" />
      <MainButton>Enviar</MainButton>
    </form>
  );
}

// tenes que resolver la parte estetica de reportPetForm (creo), y hacer el deploy de nuevo en heroku (porque modificaste algo del proyecto modulo 7), cuando termines todo capaz tengas tmb que hacer el nuevo build en github
