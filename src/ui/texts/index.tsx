import React, { useState } from "react";
import css from "./index.css";
import { motion } from "framer-motion"; //tengo que agregar animate al className

export function NavMenuText({ children }) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <h2
      style={{
        color: isHovering ? "rgb(207, 106, 177)" : "white",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={css.NavMenuText}
    >
      {children}
    </h2>
  );
}

export function MainTitleText({ children }) {
  return <h1 className={css.MainTitleText}>{children}</h1>;
}

export function MainSubtitleText({ children }) {
  return <h2 className={css.MainSubitleText}>{children}</h2>;
}

export function ParagraphText({ children }) {
  return <p className={css.paragraphText}>{children}</p>;
}

export function FooterText({ children }) {
  return <h4 className={css.footerText}>{children}</h4>;
}
