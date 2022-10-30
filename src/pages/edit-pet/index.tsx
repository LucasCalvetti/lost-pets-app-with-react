import React from "react";
import css from "./index.css";
import { ReportPetForm } from "components/report-pet-form";
import { useGetPetByParams } from "hooks";

export function EditPet() {
    const pet = useGetPetByParams();

    return (
        <div>
            <ReportPetForm formTitle="Editar mascota perdida" pet={pet} editFlag={true} />
            <div className={css.buttonContainer}></div>
        </div>
    );
}
