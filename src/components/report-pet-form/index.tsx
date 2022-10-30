import { DropzoneComp } from "components/dropzone";
import React, { useEffect, useState } from "react";
import { MainTitleText, ParagraphText } from "ui/texts";
import { MainButton } from "ui/buttons";
import { useLastPetToCreate, userData, usePostNewReportedPetValue, useDeletePet } from "hooks";
import { TextField } from "ui/text-field";
import { Mapping } from "components/map-component";
import { TextArea } from "ui/text-area";
import { useNavigate } from "react-router-dom";
import { pet } from "lib/api";
import css from "./index.css";

type props = {
    formTitle: string;
    pet?: pet;
    editFlag?: boolean;
};

export function ReportPetForm(props: props) {
    const navigate = useNavigate();
    const { userId, token } = userData();
    const apiResponse: any = usePostNewReportedPetValue();
    const [petToReport, setPetToReport] = useLastPetToCreate();
    const [editFlag, setEditFlag] = useState(props.editFlag || false);
    useEffect(() => {
        if (props.pet) {
            const { id, petName, lat, lng, description, petImg, location, userId } = props.pet;
            setPetToReport((lastState) => {
                return { ...lastState, id, petName, lat, lng, description, petImg, location, userId, edit: true };
            });
        }
    }, [props.pet]);
    const [showPopUp, setShowPopUp] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        const petName = e.target.name.value;
        const description = e.target.description.value;
        const location = e.target.location.value;

        setPetToReport((lastState) => {
            return { ...lastState, userId, token, petName, location, description };
        });
    }

    useEffect(() => {
        if (apiResponse.newPet || apiResponse.updatedPet) {
            setPetToReport({ id: null, petName: null, lat: null, lng: null, petImg: null, location: null, found: false, description: null, userId: null, token: null, edit: false });
            console.log(apiResponse);
            setShowPopUp(true);
            setEditFlag(false);
        }
    }, [apiResponse]);

    async function handleClick() {
        if (confirm("Estas seguro/a que querés reportarla como encontrada? si es asi, los datos de tu mascotas serán borrados de la base de datos.")) {
            const response = await useDeletePet(token, props.pet.id);
            if (response.deletedPet) {
                alert(`${props.pet.petName} ha sido eliminada de la base de datos.`);
                navigate("/user/pets");
            }
        }
    }

    return showPopUp ? (
        <div className={css.popUpContainer}>
            <ParagraphText>Datos de {props.pet.petName} editados correctamente.</ParagraphText>
            <MainButton
                onClick={() => {
                    navigate("/user/pets");
                    setShowPopUp(false);
                }}
            >
                Ir a tus mascotas reportadas
            </MainButton>
        </div>
    ) : (
        <div className={css.formContainer}>
            <form className={css.form} onSubmit={handleSubmit}>
                <MainTitleText>{props.formTitle}</MainTitleText>
                <div>
                    <ParagraphText>Nombre:</ParagraphText>
                    <TextField maxLength={40} name="name" type="text">
                        {petToReport.petName ? petToReport.petName : null}
                    </TextField>
                </div>
                <div>
                    <ParagraphText>Imagen de tu mascota perdida:</ParagraphText>
                    <DropzoneComp />
                    <ParagraphText>
                        La imagen no puede superar los 60kb, si necesitas achicarla,
                        {
                            <a href="https://www.achicarimagenes.com.ar/" target="_blank">
                                {" haz click aquí"}
                            </a>
                        }
                    </ParagraphText>
                </div>
                <Mapping lat={petToReport.lat ? petToReport.lat : null} lng={petToReport.lng ? petToReport.lng : null} location={petToReport.location ? petToReport.location : null} />
                <div>
                    <ParagraphText>Describelo/a:</ParagraphText>
                    <TextArea maxLength={255} name="description" placeHolder="¿Cómo es? ¿Algún razgo distintivo? ¿Cuándo se perdió? etc...">
                        {petToReport.description ? petToReport.description : ""}
                    </TextArea>
                </div>
                {petToReport.id ? <MainButton>Aplicar cambios</MainButton> : <MainButton>Reportar Mascota</MainButton>}
            </form>
            {editFlag ? <MainButton onClick={handleClick}>Reportar como encontrada</MainButton> : null}
        </div>
    );
}
