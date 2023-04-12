import React from 'react';

import BaseButton from "../BaseButton/BaseButton";
import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.jsx";
import {classes} from "../../../core/helpers/classes.js";
import css from "./BaseCart.module.scss";

const BaseCart = ({
                                        title,
                                        description,
                                        children,
                                        className,
                                        action,
                                        isLoading,
                                        actionHandler
                                    }) => {
    return (
        <div className={classes(css.BaseCart, className || "")}>
            {!isLoading && (
                <div className={"text-lg min-h-[80px] p-4"}>
                    {title}
                </div>
            )}
            {isLoading && (
                <BaseSkeleton className={"min-h-[80px]"}/>
            )}
            <div className={"w-full h-px bg-gray-100"} />
            {!isLoading && children}
            {
                !isLoading && !children && <div className={"p-4"}>
                    {description}
                    <BaseButton className={"hover:bg-purple"} onClick={actionHandler}>{action}</BaseButton>
                </div>
            }
            {isLoading && <BaseSkeleton className={"min-h-[110px]"}/>}
        </div>
    );
};

export default BaseCart;
