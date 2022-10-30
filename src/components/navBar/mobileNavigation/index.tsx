import React, { useState } from "react";
import css from "./index.css";
import { NavLinks } from "components/navBar/navLinks";
import Hamburger from "hamburger-react";
import { useUserDataAtom } from "hooks";

export function MovileNavigation() {
    const [showMenu, setShowMenu] = useState(false);

    const [userData, setUserData] = useUserDataAtom();

    return (
        <nav className={css.movileNav}>
            <div className={css.hamburgerContainer}>
                <Hamburger toggled={showMenu} toggle={setShowMenu} duration={0.7} />
            </div>
            {showMenu && (
                <div className={css.navMenuContainer}>
                    <NavLinks isLogged={userData.isLogged} setShowMenu={setShowMenu} isMobile={true} setUserData={setUserData} />
                </div>
            )}
        </nav>
    );
}
