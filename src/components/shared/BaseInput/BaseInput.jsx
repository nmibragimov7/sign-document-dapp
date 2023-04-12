import React, {memo} from 'react';

import {classes} from "../../../core/helpers/classes.js";
import css from './BaseInput.module.scss';

const BaseInput = memo((props) => {
    const {
        name,
        value,
        type = "text",
        placeholder,
        onChange,
        className,
        readonly = false
    } = props;

    return (
        <>
            <input
                name={name}
                value={value}
                placeholder={placeholder}
                type={type}
                className={classes(css.BaseInput, className || '')}
                autoComplete={"new-password"}
                disabled={readonly}
                readOnly={readonly}
                onChange={onChange}
            />
        </>
    );
});

export default BaseInput;
