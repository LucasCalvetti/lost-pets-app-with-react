import React from "react";
import css from "./index.css";
import logo from "assets/paw.png";
import { FooterText } from "ui/texts";

export function Footer() {
    return (
        <div className={css.footerContainer}>
            <FooterText>MascotasPerdidasAPP© 2022</FooterText>
            <img src={logo} alt="huella" />
            <div>
                <FooterText>App desarrollada por: </FooterText>
                <FooterText>Lucas M. Calvetti</FooterText>
            </div>
        </div>
    );
}
