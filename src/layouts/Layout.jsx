import React from 'react';
import {Outlet} from "react-router-dom";

import Header from "../components/layout/Header/Header.jsx";


const Layout = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col gap-10">
                <Header/>
                <div className="container mx-auto min-h-[80vh]">
                    <Outlet/>
                </div>
            </div>
        </>
    );
};

export default Layout;
