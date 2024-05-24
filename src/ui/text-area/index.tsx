import React from "react";
import css from "./index.css";

type TextAreaType = {
  name: string;
  placeholder?: string;
  children?: string;
  maxLength?: number;
};

export function TextArea({ name, placeholder, children, maxLength }: TextAreaType) {
  return <textarea className={css.root} name={name} cols={30} rows={10} maxLength={maxLength ? maxLength : 255} defaultValue={children || ""} placeholder={placeholder || ""} required></textarea>;
}
