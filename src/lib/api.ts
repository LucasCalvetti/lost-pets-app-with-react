const API_URL = "https://lost-pets-app-with-react-9zfk.vercel.app";

//---------------------------------------------------------------------------------------//

type login = {
    token: string;
    access: boolean;
    error?: string;
};

export async function loginToAPI(data: { email: string; password: string }) {
    const response: login = await (
        await fetch(API_URL + "/user/auth/token", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
    ).json();
    return response;
}

//---------------------------------------------------------------------------------------//

type user = {
    id: number;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

type createUserResponse = {
    user: user;
    created: boolean;
    message: string;
    error?: string;
};

export async function createUser(data: { fullName: string; email: string; password: string }) {
    const response: createUserResponse = await (
        await fetch(API_URL + "/user", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
    ).json();

    return response;
}

//---------------------------------------------------------------------------------------//

export type pet = {
    id: number;
    petName: string;
    lat: number;
    lng: number;
    petImg: string;
    location: string;
    found: boolean;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    userId: number;
};

type createPetResponse = {
    newPet: {
        pet: pet;
        petCreated: boolean;
    };
};

export async function createPet(token: string, data: { petName: string; petImg: string; lng: string; lat: string; description: string; location: string }) {
    const response: createPetResponse = await (
        await fetch(API_URL + "/user/pet", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
    ).json();

    return response;
}

//---------------------------------------------------------------------------------------//

export async function createReport(data: { fullName: string; phoneNumber: number; description: string; petId: number }) {
    const response = await (
        await fetch(API_URL + "/user/pet/report", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
    ).json();

    return response;
}

//---------------------------------------------------------------------------------------//
type emailValidationResponse = {
    error: { error?: string };
    boolean;
};

export async function emailValidation(data: { email: string }) {
    const response: emailValidationResponse = await (await fetch(API_URL + "/user/email?email=" + data.email)).json();

    return response;
}

// devuelve array de objetos de todos los reportes que tuvieron tus mascotas

//---------------------------------------------------------------------------------------//

type petReport = {
    id: number;
    fullName: string;
    phoneNumber: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    petId: number;
    userId: number;
};

export async function getMyPetReports(token: string) {
    const response: petReport[] = await (
        await fetch(API_URL + "/user/pet", {
            method: "GET",
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
    ).json();

    return response;
}

//---------------------------------------------------------------------------------------//

export async function getMyUserProfile(token: string) {
    const response: user = await (
        await fetch(API_URL + "/user/profile", {
            method: "GET",
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
    ).json();

    return response;
}

//---------------------------------------------------------------------------------------//

export async function getAllMyPets(token: string) {
    const response: pet[] = await (
        await fetch(API_URL + "/user/pet", {
            method: "GET",
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
    ).json();

    return response;
}

//---------------------------------------------------------------------------------------//

export async function getPetById(token: string, petId: number) {
    const response: pet = await (
        await fetch(API_URL + "/user/pet/" + petId.toString(), {
            method: "GET",
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
    ).json();

    return response;
}

//---------------------------------------------------------------------------------------//

type petsAroundResponse = {
    hits: number;
    petsAround: pet[];
};

export async function getPetsAround(lat: string, lng: string) {
    const response: petsAroundResponse = await (await fetch(API_URL + `/pets/around?lat=${lat}&lng=${lng}`)).json();

    return response;
}

//---------------------------------------------------------------------------------------//

type updatedPetResponse = {
    updatedPet: number[];
    updatedAlgoliaPet: { objectID: string; taskID: number };
    message: string;
};

export async function updatePetData(token: string, petId: number, dataToUpdate: { petName: string; petImg: string; lng: number; lat: number; description: string; location: string }) {
    const response: updatedPetResponse = await (
        await fetch(API_URL + `/user/pet/${petId}`, {
            method: "PATCH",
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToUpdate),
        })
    ).json();

    return response;
}

//---------------------------------------------------------------------------------------//

type updatedProfileResponse = {
    usersUpdated: { userUpdated: number[]; user: user };
    authUpdated: { userUpdated: number[] };
    userWhoWasUpdated: number;
};

export async function updateProfileData(token: string, dataToUpdate: { fullName: string; email: string; password?: string }) {
    if (dataToUpdate.password == undefined) {
        delete dataToUpdate["password"];

        const response: updatedProfileResponse = await (
            await fetch(API_URL + `/user/profile`, {
                method: "PATCH",
                headers: {
                    Authorization: `bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToUpdate),
            })
        ).json();

        return response;
    } else {
        const response: updatedProfileResponse = await (
            await fetch(API_URL + `/user/profile`, {
                method: "PATCH",
                headers: {
                    Authorization: `bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToUpdate),
            })
        ).json();

        return response;
    }
}

//---------------------------------------------------------------------------------------//

type deletedPetResponse = {
    message: string;
    deletedPet: number;
    error?: string;
};

export async function deletePet(token: string, petId: number) {
    const response: deletedPetResponse = await (
        await fetch(API_URL + `/user/pet/${petId}`, {
            method: "DELETE",
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
    ).json();

    return response;
}
