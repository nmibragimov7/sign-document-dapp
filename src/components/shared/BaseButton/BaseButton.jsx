import React from 'react';

import {classes} from "../../../core/helpers/classes";
import css from './BaseButton.module.scss';

const BaseButton = (props) => {
    const { type = "primary", disabled = false, className, children, onClick } = props;

    return (
        <button
            disabled={disabled}
            className={classes(css.BaseButton, className || '', css[type])}
            onClick={onClick}
        >
            { children }
        </button>
    );
};

export default BaseButton;
