import React from "react";
import css from "./index.css";
import { MainTitleText, ParagraphText } from "ui/texts";
import { useNavigate } from "react-router-dom";
import { RegistrationAndDataForm } from "components/registration-and-data-form";

export function Registration() {
    return (
        <div className={css.container}>
            <MainTitleText>Registro</MainTitleText>
            <RegistrationAndDataForm />
        </div>
    );
}
