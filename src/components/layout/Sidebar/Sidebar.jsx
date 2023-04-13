import React from 'react';

import {classes} from "../../../core/helpers/classes.js";
import {links} from "../../../core/contants/index.js";
import close from "../../../assets/close.svg";
import css from "../Header/Header.module.scss";
import {useNavigate} from "react-router-dom";
import {Web3Button} from "@web3modal/react";

const Sidebar = ({isShown, setState}) => {
    const navigate = useNavigate();
    const onNavigate = (to) => {
        navigate(to);
        setState(false);
    }

    return (
        <>
            <div className={classes("w-full max-w-xs z-30 md:hidden transition bg-black p-4 flex flex-col fixed top-0 right-0 bottom-0", {"-right-[100vh] translate-x-full": !isShown})}>
                <img
                    src={close}
                    alt="close"
                    className={"top-0 left-0 w-5 h-5 cursor-pointer"}
                    onClick={() => setState(false)}
                />
                <div className={"flex flex-col gap-8 my-4"}>
                    <div>
                        {links.map(link => (
                            <div key={link.to} className={classes(css.menuItem)} onClick={() => onNavigate(link.to)}>
                                <div
                                    className={classes(
                                        "transition-all text-lg text-gray-100 font-semibold hover:text-purple",
                                        {"!text-purple": location.pathname === link.to})}
                                >
                                    {link.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"flex justify-center"}>
                        <Web3Button
                            icon="show"
                            label="Подключить кошелек"
                            balance="show"
                            avatar="show"
                            className={"text-red"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
