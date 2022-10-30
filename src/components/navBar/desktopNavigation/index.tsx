import React, { useState } from "react";
import css from "./index.css";
import { NavLinks } from "components/navBar/navLinks";
import { useUserDataAtom } from "hooks";

export function DesktopNavigation() {
    const [userData, setUserData] = useUserDataAtom();

    return (
        <nav className={css.desktopNav}>
            <NavLinks isLogged={userData.isLogged} isMobile={false} setUserData={setUserData} />
        </nav>
    );
}
