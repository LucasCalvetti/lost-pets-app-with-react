import React from "react";
import css from "./index.css";
import logo from "assets/paw.png";
import { MainSubtitleText } from "ui/texts";

export function Footer() {
    return (
        <div className={css.footerContainer}>
            <MainSubtitleText>MascotasPerdidasAPP© 2022</MainSubtitleText>
            <img src={logo} alt="huella" />
            <MainSubtitleText>App desarrollada por: Lucas M. Calvetti</MainSubtitleText>
        </div>
    );
}
