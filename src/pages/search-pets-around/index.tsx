import React, { useState } from "react";
import css from "./index.css";
import { PetCard } from "components/pet-card";
import { useSearchPetsAround } from "hooks/searchPetsAround";
import { MainTitleText } from "ui/texts";

export function SearchPetsAround() {
    const [popUpReport, setPopUpReport] = useState(false);
    const { hits, petsAround } = useSearchPetsAround();
    function handleClick() {
        popUpReport ? setPopUpReport(false) : setPopUpReport(true);
    }
    return (
        <div className={css.pageContainer}>
            <MainTitleText>Mascotas encontradas cerca tuyo: {hits}</MainTitleText>
            <ul className={css.ul}>
                {petsAround.map((r) => (
                    <li key={r.id} className={css.li}>
                        <PetCard report={true} pet={r} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
