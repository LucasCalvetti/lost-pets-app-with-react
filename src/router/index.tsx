import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { SearchPetsAround } from "../pages/search-pets-around";
import { Profile } from "../pages/Profile";
import { LoginValidation } from "../pages/login-validation";
import { UserReportedPets } from "../pages/user-pets-reported";
import { Layout } from "components/Layout";
import { Registration } from "../pages/registration";
import { ReportNewPet } from "../pages/report-new-pet";
import { EditPet } from "../pages/edit-pet";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<LoginValidation />} />
                <Route path="pets/search/:geoloc" element={<SearchPetsAround />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/user/pets" element={<UserReportedPets />} />
                <Route path="/user/create/pet" element={<ReportNewPet />} />
                <Route path="/user/edit/:petId" element={<EditPet />} />
            </Route>
        </Routes>
    );
}
