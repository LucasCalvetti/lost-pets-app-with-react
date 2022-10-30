import React, { useEffect, useState } from "react";
import css from "./index.css";
import { useGetUserReportedPets, useUserDataAtom } from "hooks";
import { PetCard } from "components/pet-card";
import { userData } from "hooks";
import { useNavigate } from "react-router-dom";

export function UserReportedPets() {
    const navigate = useNavigate();
    const { isLogged } = userData();
    useEffect(() => {
        if (!isLogged) {
            navigate("/login");
        }
    }, [isLogged]);

    const [petResults, setPetResults] = useState([]);
    const [{ token }] = useUserDataAtom();

    async function getPetsReported() {
        const result = await useGetUserReportedPets(token);
        setPetResults(result);
    }
    useEffect(() => {
        getPetsReported();
    }, []);

    return (
        <div className={css.pageContainer}>
            <div className={css.petsContainer}>
                {petResults.map((pet) => {
                    return (
                        <div key={pet.id}>
                            <PetCard edit={true} key={pet.id} pet={pet} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
