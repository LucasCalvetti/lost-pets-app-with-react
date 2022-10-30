import React from "react";
import css from "./index.css";
import { MenuLink } from "components/navBar/MenuLink";
import { useNavigate } from "react-router-dom";

type props = {
    isLogged: boolean;
    setShowMenu?: (boolean: boolean) => any;
    isMobile: boolean;
    setUserData: any;
};

export function NavLinks(props: props) {
    const navigate = useNavigate();
    var { setShowMenu, isLogged, setUserData, isMobile } = props;

    function navigationIfNotLogged(url: string) {
        localStorage.setItem("from", url);
        navigate("/login");
    }

    function hanlderNavigation(navigateTo: string) {
        if (isLogged && isMobile) {
            //mobile
            navigate(navigateTo);
            setShowMenu(false);
        } else if (!isLogged && isMobile) {
            navigationIfNotLogged(navigateTo);
            setShowMenu(false);
        } else if (isLogged) {
            //desktop
            navigate(navigateTo);
        } else {
            navigationIfNotLogged(navigateTo);
        }
    }

    const navigationMap = {
        profile: "/user/profile",
        petsReported: "/user/pets",
        reportPet: "/user/create/pet",
    };

    const links = [
        {
            children: ["Mis Datos"],
            handleClick: function () {
                hanlderNavigation(navigationMap.profile);
            },
        },
        {
            children: ["Mis mascotas reportadas"],
            handleClick: function () {
                hanlderNavigation(navigationMap.petsReported);
            },
        },
        {
            children: ["Reportar Mascota"],
            handleClick: function () {
                hanlderNavigation(navigationMap.reportPet);
            },
        },
        {
            children: ["Iniciar Sesion", "Cerrar Sesion"],
            handleClick: function () {
                if (isLogged && isMobile) {
                    //mobile
                    setUserData({ name: null, email: null, token: null, isLogged: false, userId: null });
                    setShowMenu(false);
                } else if (!isLogged && isMobile) {
                    localStorage.setItem("from", "/");
                    navigate("/login");
                } else if (isLogged) {
                    //desktop
                    setUserData({ name: null, email: null, token: null, isLogged: false, userId: null });
                } else {
                    localStorage.setItem("from", "/");
                    navigate("/login");
                }
            },
        },
    ];

    return (
        <ul className={css.menuLinkList}>
            {links.map((link, index) => (
                <MenuLink key={index} delay={{ delay: 0.15 * index }} onClick={link.handleClick}>
                    {isLogged ? link.children[1] || link.children[0] : link.children[0]}
                </MenuLink>
            ))}
        </ul>
    );
}
