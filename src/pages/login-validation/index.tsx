import React, { useEffect, useState } from "react";
import css from "./index.css";
import { MainTitleText, ParagraphText } from "ui/texts";
import { EmailValidationForm } from "components/email-validation-form";
import { LoginValidationForm } from "components/login-form";
import { userData } from "hooks";
import { useNavigate } from "react-router-dom";

export function LoginValidation() {
    const [showPassWordForm, setshowPassWordForm] = useState(false);
    const navigate = useNavigate();
    const { isLogged, email } = userData();
    //Cuando se monta el componente, checkea si el/la user esta logeado, si lo esta, lx envia a la home. Previene que usuarixs vayan manualmente o con la flecha "atras" del navegador a /email estando logueados

    useEffect(() => {
        if (isLogged) {
            navigate("/");
        }
        if (email != null) {
            setshowPassWordForm(true);
        }
    }, [email]);

    return (
        <div className={css.container}>
            <MainTitleText>Ingresar</MainTitleText>
            <ParagraphText>Para ingresar una mascota, o consultar datos de usuario necesitamos que previamente ingreses a tu cuenta. Si no tienes cuenta, al ingresar tu mail te pedirá datos para crearla.</ParagraphText>
            {showPassWordForm ? <LoginValidationForm /> : <EmailValidationForm />}
        </div>
    );
}
