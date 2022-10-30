import React, { useEffect } from "react";
import { ReportPetForm } from "components/report-pet-form";
import { userData } from "hooks";
import { useNavigate } from "react-router-dom";

export function ReportNewPet() {
    const navigate = useNavigate();
    const { isLogged } = userData();
    useEffect(() => {
        if (!isLogged) {
            navigate("/login");
        }
    }, [isLogged]);
    return (
        <div>
            <ReportPetForm formTitle="Reportar mascota perdida" />
        </div>
    );
}
