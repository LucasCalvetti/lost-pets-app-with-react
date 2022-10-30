import React, { useState } from "react";
import css from "./index.css";
import { pet } from "lib/api";
import { MainTitleText, MainSubtitleText, ParagraphText } from "ui/texts";
import { MainButton } from "ui/buttons";
import { ReportPet } from "components/report-pet";
import { useNavigate } from "react-router-dom";

type props = {
    pet: pet;
    report?: boolean;
    edit?: boolean;
};

export function PetCard(props: props) {
    const [popUpReport, setPopUpReport] = useState(false);
    var reportFlag = props.report || false;
    var editFlag = props.edit || false;
    const navigate = useNavigate();

    function capitalizeString(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function handleReportClick() {
        popUpReport ? setPopUpReport(false) : setPopUpReport(true);
    }
    function handleEditClick() {
        navigate("/user/edit/" + props.pet.id.toString());
    }
    return (
        <div className={css.cardContainer}>
            <img className={css.petImg} src={props.pet.petImg} alt="Mascota" />
            <div className={css.textContainer}>
                <MainTitleText>{capitalizeString(props.pet.petName)}</MainTitleText>
                <div>
                    <MainSubtitleText>{capitalizeString(props.pet.location)}</MainSubtitleText>
                </div>
                <div className={css.descriptionContainer}>
                    <ParagraphText>{capitalizeString(props.pet.description)}</ParagraphText>
                </div>
            </div>
            {reportFlag ? <MainButton onClick={handleReportClick}>Reportar mascota</MainButton> : null}
            {editFlag ? <MainButton onClick={handleEditClick}>Editar mascota</MainButton> : null}
            {popUpReport ? <ReportPet petId={props.pet.id} petName={props.pet.petName} setPopUpReport={setPopUpReport}></ReportPet> : null}
        </div>
    );
}
