import React from 'react';

import {classes} from "../../../core/helpers/classes.js";
import css from './BaseSkeleton.module.scss';

const BaseSkeleton = (props) => {
    const { children, className } = props;
    return <div className={classes(css.BaseSkeleton, className || "")}>{children}</div>;
};

export default BaseSkeleton;
