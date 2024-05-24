import React from "react";
import css from "./index.css";

type TextFieldType = {
  name: string;
  placeholder?: string;
  type: "text" | "number" | "email" | "password" | "tel";
  children?: string;
  maxLength?: number;
  onChange?: (e?) => any;
  value?: string;
};

export function TextField({ name, placeholder, type, children, maxLength, onChange, value }: TextFieldType) {
  let newType = type;
  let pattern = "";
  if (type == "number") {
    newType = "text";
    pattern = "[0-9]*";
  }
  return <input name={name} className={css.root} placeholder={placeholder || ""} required maxLength={maxLength || 100} type={newType} defaultValue={children || ""} pattern={pattern} onChange={onChange} value={value} />;
}

export function TextFieldNonRequired({ name, placeholder, type, children, maxLength, onChange, value }: TextFieldType) {
  let newType = type;
  let pattern = "";
  if (type == "number" || type == "tel") {
    pattern = "[0-9]*";
  }
  return <input name={name} className={css.root} placeholder={placeholder || ""} maxLength={maxLength || 100} type={newType} defaultValue={children || ""} pattern={pattern} onChange={onChange} value={value} />;
}
