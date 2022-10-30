import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import css from "./layout.css";
import { Header } from "components/header";
import loading from "assets/loading-cat.gif";
import { Footer } from "components/footer";

function Layout() {
    return (
        <div>
            <Header />
            <section className={css.section}>
                <Suspense
                    fallback={
                        <div className={css.img}>
                            <img className={css.img} src={loading} alt="Loading..." />
                        </div>
                    }
                >
                    <Outlet />
                </Suspense>
            </section>
            <Footer />
        </div>
    );
}

export { Layout };
