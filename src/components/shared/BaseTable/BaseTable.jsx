import React from "react";

import BaseSkeleton from "../BaseSkeleton/BaseSkeleton.jsx";
import {classes} from "../../../core/helpers/classes.js";
import css from "./BaseTable.module.scss";

const BaseTable = (props) => {
    return (
        <div className={classes(css.tableWrap, props.styles || "")}>
            <table className="w-full border-collapse border-spacing-0">
                <thead className={"bg-blue"}>
                <tr>
                    {props.cols.map((col) =>
                        <td
                            key={col.key}
                            className={classes(
                                "py-4 px-8 max-w-[11rem] whitespace-pre-line text-sm text-gray-100 bg-black text-center",
                            )}
                        >
                            {col.label}
                        </td>
                    )}
                </tr>
                </thead>
                <tbody>
                {!props.isLoading && props.data && props.data.length
                    ? props.data.map((item, idx) => {
                        return (
                            <tr key={`tr-${idx}`} className={"bg-gray-100 even:bg-gray-300"}>
                                {props.cols.map((col, idy) => (
                                    <td
                                        key={`td-${idx}${idy}`}
                                        className={classes(
                                            "py-3 px-8 text-sm text-center text-dark whitespace-nowrap",
                                        )}
                                    >
                                        {col.render ? col.render(item) : item[col.key]}
                                    </td>
                                ))}
                            </tr>
                        );
                    })
                    : null}
                {props.isLoading && (
                    <tr key="isLoading" className={"bg-gray-100"}>
                        <td
                            colSpan={props.cols.length}
                            className={classes("text-sm text-dark whitespace-nowrap")}
                        >
                            <BaseSkeleton className={"min-h-[110px]"}/>
                        </td>
                    </tr>
                )}
                {!props.isLoading && props.data && !props.data.length && (
                    <tr key="no-data" className={"bg-gray-100 even:bg-gray-300"}>
                        <td
                            colSpan={props.cols.length}
                            className={classes("py-3 px-8 text-sm text-dark whitespace-nowrap")}
                        >
                            <div className="text-center font-semibold">
                                не найдено
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default BaseTable;
