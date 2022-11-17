import React, { useState } from "react";
import css from "./index.css";

type TextFieldType = {
    name: string;
    placeHolder?: string;
    type: "text" | "number" | "email" | "password";
    children?: string;
    maxLength?: number;
    onChange?: (e?) => any;
};

export function TextField({ name, placeHolder, type, children, maxLength, onChange }: TextFieldType) {
    return <input name={name} className={css.root} placeholder={placeHolder || ""} required maxLength={maxLength || 100} type={type} defaultValue={children || ""} onChange={onChange} />;
}

export function TextFieldNonRequired({ name, placeHolder, type, children, maxLength, onChange }: TextFieldType) {
    return <input name={name} className={css.root} placeholder={placeHolder || ""} maxLength={maxLength || 100} type={type} defaultValue={children || ""} onChange={onChange} />;
}
