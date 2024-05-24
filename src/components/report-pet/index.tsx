import React, { useState, useEffect } from "react";
import css from "./index.css";
import { MainTitleText, ParagraphText } from "ui/texts";
import { TextField } from "ui/text-field";
import { TextArea } from "ui/text-area";
import { ExitButton, SendButton } from "ui/buttons";
import { createReport } from "lib/api";

type props = {
  petName: string;
  petId: number;
  setPopUpReport: any;
};

export function ReportPet({ petName, petId, setPopUpReport }: props) {
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Función para cerrar el popUp cuando se hace clic fuera del popUpContainer
    const handleClickOutside = (event) => {
      if (event.target.id === "1") {
        setPopUpReport(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setPopUpReport]);

  function handleSubmit(e) {
    e.preventDefault();
    const nombre = e.target.name.value;
    const phone = e.target.phone.value;
    const description = e.target.description.value;
    const newReport = {
      fullName: nombre,
      phoneNumber: phone,
      description,
      petId,
    };
    createReport(newReport).then((res) => {
      if (res.error) {
        alert("Ha ocurrido el siguiente error: " + res.error);
      } else {
        alert("Se ha enviado un mail con tu reporte al dueño de " + petName + ". ¡Muchas gracias!");
        setPopUpReport(false);
      }
    });
  }

  const handleChange = (event) => {
    const input = event.target.value;
    // Verificar si el valor ingresado es un número válido (incluyendo "+")
    if (/^[\d+]*$/.test(input)) {
      setPhone(input);
    }
  };

  return (
    <div id="1" className={css.popUpBackground}>
      <div className={css.popUpContainer}>
        <ExitButton
          onClick={() => {
            setPopUpReport(false);
          }}
        />

        <div className={css.title}>
          <MainTitleText>Reportar info de {petName}</MainTitleText>
        </div>
        <form onSubmit={handleSubmit} className={css.form}>
          <ParagraphText>Tu nombre:</ParagraphText>
          <TextField maxLength={40} type="text" name="name" />
          <ParagraphText>Tu teléfono:</ParagraphText>
          <TextField maxLength={40} type="tel" name="phone" onChange={handleChange} value={phone} />
          <ParagraphText>¿Dónde lo viste?</ParagraphText>
          <TextArea maxLength={500} placeholder="Lo vi en..." name="description" />
          <SendButton>Enviar reporte</SendButton>
        </form>
      </div>
    </div>
  );
}
