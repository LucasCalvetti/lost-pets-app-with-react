import React, { useEffect } from "react";
import css from "./index.css";
import { MainTitleText } from "ui/texts";
import { RegistrationAndDataForm } from "components/registration-and-data-form";
import { userData } from "hooks";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const navigate = useNavigate();
    const { isLogged } = userData();
    useEffect(() => {
        if (!isLogged) {
            navigate("/login");
        }
    }, [isLogged]);
    return (
        <div className={css.formWithTitleContainer}>
            <MainTitleText>Mis datos:</MainTitleText>
            <RegistrationAndDataForm />
        </div>
    );
}
