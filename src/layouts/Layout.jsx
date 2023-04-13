import React, {useState} from 'react';
import {Outlet} from "react-router-dom";

import Header from "../components/layout/Header/Header.jsx";
import Sidebar from "../components/layout/Sidebar/Sidebar.jsx";


const Layout = () => {
    const [isShown, setIsShown] = useState(false);
    return (
        <>
            <div className="min-h-screen flex flex-col gap-4 md:gap-10">
                <Header setState={setIsShown}/>
                <Sidebar isShown={isShown} setState={setIsShown}/>
                <div className="container mx-auto md:min-h-[80vh] px-2 md:px-0">
                    <Outlet/>
                </div>
            </div>
        </>
    );
};

export default Layout;
