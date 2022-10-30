import React from "react";
import css from "./index.css";

type TextAreaType = {
    name: string;
    placeHolder?: string;
    children?: string;
    maxLength?: number;
};

export function TextArea({ name, placeHolder, children, maxLength }: TextAreaType) {
    return <textarea name={name} cols={30} rows={10} maxLength={maxLength ? maxLength : 255} defaultValue={children || ""} placeholder={placeHolder || ""} required></textarea>;
}
