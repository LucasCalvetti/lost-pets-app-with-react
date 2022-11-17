import { PetCard } from "components/pet-card";
import { loginToAPI, emailValidation, createUser, updateProfileData, getMyUserProfile, getMyPetReports, createPet, getPetById, updatePetData, deletePet } from "lib/api";
import { recoilPersist } from "recoil-persist";
import { EditPet } from "pages/edit-pet";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { atom, useSetRecoilState, useRecoilState, useRecoilValue, selector, useResetRecoilState } from "recoil";

const { persistAtom } = recoilPersist({
    key: "data",
    storage: localStorage,
});

const userDataAtom = atom({
    key: "userData",
    default: {
        name: null,
        email: null,
        token: null,
        isLogged: false,
        userId: null,
    },
    effects_UNSTABLE: [persistAtom],
});

export async function useLogin(email: string, password: string) {
    const log = await loginToAPI({ email, password });
    return log;
}

//Funciones para importar el uso de los atoms en paginas y componentes
export const useUserDataAtom = () => useRecoilState(userDataAtom);
export const setUserDataAtom = () => useSetRecoilState(userDataAtom);
export const userData = () => useRecoilValue(userDataAtom);

export async function useEmailValidation(email: string) {
    const response = await emailValidation({ email });
    //ver si administro el error aca
    return response;
}

export async function useCreateUser(data: { fullName; email; password }) {
    const response = await createUser(data);
    return response;
}
export async function useUpdateProfileData(token: string, data: { fullName: string; email: string; password?: string }) {
    const response = await updateProfileData(token, data);
    return response;
}

export async function useGetUserProfileInfo(token: string) {
    const response = await getMyUserProfile(token);
    return response;
}

export async function useGetUserReportedPets(token: string) {
    const result = await getMyPetReports(token);

    return result;
}

const lastPetToCreate = atom({
    key: "lastPetToCreate",
    default: {
        id: null,
        petName: null,
        lat: null,
        lng: null,
        petImg: null,
        location: null,
        found: false,
        description: null,
        userId: null,
        token: null,
        edit: false,
    },
    effects_UNSTABLE: [persistAtom],
});

const postNewReportedPet = selector({
    key: "postNewReportedPet",
    get: async ({ get }) => {
        const petData = get(lastPetToCreate);
        if (!petData.id && petData.token && petData.userId && petData.edit == false) {
            const response = await createPet(petData.token, petData);
            return response;
        } else if (petData.id && petData.token && petData.userId && petData.edit) {
            const response = await updatePetData(petData.token, petData.id, { petName: petData.petName, petImg: petData.petImg, lng: petData.lng, lat: petData.lat, description: petData.description, location: petData.location });
            return response;
        } else {
            return {};
        }
    },
});
export const usePostNewReportedPetValue = () => useRecoilValue(postNewReportedPet);
export const useLastPetToCreate = () => useRecoilState(lastPetToCreate);
export const useSetLastPetToCreate = () => useSetRecoilState(lastPetToCreate);

const petIdParamAtom = atom({
    key: "petIdParams",
    default: { petId: null, token: null },
});

const petFoundById = selector({
    key: "petFoundById",
    get: async ({ get }) => {
        const atomValues = get(petIdParamAtom);
        if (atomValues.petId != null && atomValues.token != null) {
            console.log(atomValues);

            const response = await getPetById(atomValues.token, parseInt(atomValues.petId));
            return response;
        } else {
            return { id: null, petName: null, lat: null, lng: null, petImg: null, location: null, found: false, description: null, userId: null, token: null, edit: false };
        }
    },
});

export function useGetPetByParams() {
    const params = useParams();
    const { token } = userData();
    const setPetIdParamsAtom = useSetRecoilState(petIdParamAtom);
    const result = useRecoilValue(petFoundById);

    useEffect(() => {
        setPetIdParamsAtom({ petId: params.petId, token });
    }, [params.petId]);
    return result;
}

export async function useDeletePet(token: string, petId: number) {
    const response = await deletePet(token, petId);
    if (response.error) {
        alert(response.error);
    }
    return response;
}
