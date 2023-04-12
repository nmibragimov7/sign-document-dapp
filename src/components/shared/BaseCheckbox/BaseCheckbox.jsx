import React from "react";
import {classes} from "../../../core/helpers/classes.js";

const BaseCheckbox = ({
                                            name,
                                            value,
                                            setValue,
                                            styles,
                                            stylesLabel,
                                            stylesInput,
                                            children}) => {
    const changed = () => {
        setValue(!value);
    }

    return (
        <div className={styles}>
            <label
                htmlFor={name}
                className={"flex items-center cursor-pointer"}
            >
                <input
                    id={name}
                    type="checkbox"
                    className={"opacity-0 w-0 h-0"}
                    checked={value}
                    onChange={changed}
                />
                <span className={classes(
                    "w-6 h-6 rounded-md border border-solid border-gray-100 mr-2.5 relative",
                    {"after:absolute after:content-[''] after:rounded after:w-4 after:h-4 after:top-1/2 after:left-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:bg-purple": value},
                    stylesInput || "")}></span>
                <span className={classes("text-sm font-medium uppercase hover:text-purple", stylesLabel || "")}>{children}</span>
            </label>
        </div>
    )
}

export default BaseCheckbox;
