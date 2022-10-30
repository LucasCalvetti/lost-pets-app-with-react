import React from "react";
import css from "./index.css";
import logo from "assets/paw-logo.png";
import { Link } from "react-router-dom";
import { MovileNavigation } from "components/navBar/mobileNavigation";
import { DesktopNavigation } from "components/navBar/desktopNavigation";
import { userData } from "hooks";
import { ParagraphText } from "ui/texts";

export function Header() {
    return (
        <header className={css.headerComponent}>
            <Link to={"/"}>
                <img src={logo} alt="logo" />
            </Link>
            <DesktopNavigation />
            <MovileNavigation />
        </header>
    );
}
