import React, { useEffect } from "react";
import { atom, useRecoilValue, selector, useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { getPetsAround } from "lib/api";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "data",
    storage: localStorage,
});

const petsAroundParams = atom({
    key: "petsAround",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

const resultsState = selector({
    key: "searchPetsAroundResults",
    get: async ({ get }) => {
        const valorDeParams = get(petsAroundParams);
        if (valorDeParams) {
            const [lat, lng] = valorDeParams.split("&", 2);
            const latFormatted = lat.split("=")[1];
            const lngFormatted = lng.split("=")[1];
            const response = await getPetsAround(latFormatted, lngFormatted);
            return response;
        } else {
            return { hits: 0, petsAround: [] };
        }
    },
});

export function useSearchPetsAround() {
    const params = useParams();
    const setPetsAroundParamsAtom = useSetRecoilState(petsAroundParams);
    const result = useRecoilValue(resultsState);

    useEffect(() => {
        setPetsAroundParamsAtom(params.geoloc);
    }, [params.geoloc]);
    return result;
}
