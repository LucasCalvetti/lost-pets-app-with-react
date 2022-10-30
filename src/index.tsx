import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./router";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const container = document.getElementById("hello-example");
const root = createRoot(container!);

root.render(
    <RecoilRoot>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </RecoilRoot>
);
