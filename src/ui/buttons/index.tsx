import React from "react";
import css from "./index.css";

type buttonType = {
  children: any;
  onClick?: any;
};

type exitButtonType = {
  onClick?: any;
};

export function MainButton({ children, onClick }: buttonType) {
  return (
    <button className={css.mainButton} onClick={onClick}>
      {children}
    </button>
  );
}
export function ExitButton({ onClick }: exitButtonType) {
  return <button className={css.exitButton} onClick={onClick} />;
}
export function SendButton({ children, onClick }: buttonType) {
  return (
    <button className={css.sendButton} onClick={onClick}>
      {children}
    </button>
  );
}
