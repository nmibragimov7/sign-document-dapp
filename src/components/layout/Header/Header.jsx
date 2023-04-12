import React, {useMemo} from 'react';
import {Web3Button} from "@web3modal/react";
import {Link, useLocation, useNavigate} from "react-router-dom";

import {classes} from "../../../core/helpers/classes.js";
import css from "./Header.module.scss";

const links = [
    { to: "/documents", title: "Документы" },
    { to: "/adding", title: "Добавить документ" },
];

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const translateX = useMemo(() => {
        const idx = links.findIndex(link => link.to === location.pathname);
        if(idx < 0) {
            return 0;
        }
        return idx;
    }, [location.pathname]);

    return (
        <>
            <div className={"hidden translate-x-[12rem]"}/>
            <div className={css.Header}>
                <div className={"container mx-auto flex justify-between items-center relative"}>
                    <Link
                        to={"/"}
                        className={classes("flex flex-col items-center transition-all cursor-pointer hover:text-purple", location.pathname === "/" && "text-purple")}>
                        <h1 className={"text-7xl font-bold"}>21</h1>
                        <p className={"text-xs uppercase"}>девишник</p>
                    </Link>
                    <div className={"flex relative"}>
                        {links.map(link => (
                            <div key={link.to} className={classes(css.menuItem)} onClick={() => navigate(link.to)}>
                                <div
                                    className={classes(
                                        "transition-all text-lg text-gray-100 font-semibold hover:text-purple",
                                        {"!text-purple": location.pathname === link.to})}
                                >
                                    {link.title}
                                </div>
                            </div>
                        ))}
                        <div className={classes(css.active, `translate-x-[${translateX * 12}rem]`, !links.some(link => location.pathname === link.to) && "hidden")}/>
                    </div>
                    <Web3Button
                        icon="show"
                        label="Подключить кошелек"
                        balance="show"
                        avatar="show"
                        className={"text-red"}
                    />
                </div>
            </div>
        </>
    );
};

export default Header;
