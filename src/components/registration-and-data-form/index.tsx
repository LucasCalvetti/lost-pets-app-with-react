import React, { useEffect, useState } from "react";
import { ParagraphText } from "ui/texts";
import { SendButton } from "ui/buttons";
import { TextField } from "ui/text-field";
import { useUserDataAtom, useCreateUser, useUpdateProfileData } from "hooks";
import { useNavigate } from "react-router-dom";
import css from "./index.css";

export function RegistrationAndDataForm() {
    const [{ name, isLogged, email, token }, setUserData] = useUserDataAtom();
    const navigate = useNavigate();

    async function updateUser(fullName: string, email: string, password: string) {
        const response = await useUpdateProfileData(token, { fullName, email, password });
        if (response.userWhoWasUpdated) {
            alert("Datos de usuario modificados exitosamente.");
            navigate("/");
        }
    }

    async function createNewUser(fullName: string, email: string, password: string) {
        const response = await useCreateUser({ fullName, email, password });

        if (response.created) {
            alert("Usuario creado satisfactoriamente, ya puedes ingresar a tu cuenta");
            navigate("/login");
        } else if (!response.created && !response.error) {
            alert("Este email ya esta registrado en la base de datos, si eres tu, por favor loggeate.");
            navigate("/login");
        } else if (response.error) {
            alert(response.error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const fullName = e.target.name.value;
        const password1 = e.target.password1.value;
        const password2 = e.target.password2.value;

        if (password1 == password2) {
            isLogged ? await updateUser(fullName, email, password1) : await createNewUser(fullName, email, password1);
        } else {
            alert("Las contraseñas no coinciden");
        }
    }
    return (
        <div className={css.formContainer}>
            <form onSubmit={handleSubmit} className={css.form}>
                <ParagraphText>Tu nombre:</ParagraphText>
                <span>{"(max: 35 caracteres)"}</span>
                <TextField name="name" type="text" maxLength={35}>
                    {name || ""}
                </TextField>
                <ParagraphText>Contraseña:</ParagraphText>
                <TextField name="password1" type="password" />
                <ParagraphText>Repetir Contraseña:</ParagraphText>
                <TextField name="password2" type="password" />
                <SendButton>Enviar</SendButton>
            </form>
        </div>
    );
}