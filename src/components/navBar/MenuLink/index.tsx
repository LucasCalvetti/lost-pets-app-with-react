import React from "react";
import css from "./index.css";
import { NavMenuText } from "ui/texts";
import paw from "assets/paw.png";
import { motion } from "framer-motion";

export function MenuLink({ children, onClick, delay }) {
    const animateFrom = { opacity: 0, y: -40 };
    const animateTo = { opacity: 1, y: 0 };

    return (
        <div className={css.container}>
            <motion.img className={css.paw} initial={animateFrom} animate={animateTo} transition={delay} src={paw} alt="patita" />
            <motion.li initial={animateFrom} animate={animateTo} transition={delay} onClick={onClick}>
                <NavMenuText>{children}</NavMenuText>
            </motion.li>
        </div>
    );
}
