import React, {useRef, useState} from 'react';

import file from "../../../assets/file.svg";
import fileTake from "../../../assets/file-take.svg";
import fileReset from "../../../assets/file-reset.svg";

const BaseFile = ({ name = "", handleChange}) => {
    const [fileName, setFileName] = useState('');
    const fileRef = useRef(null);
    const takeFile = () => {
        if(fileRef?.current?.files?.length) {
            setFileName(fileRef.current.files[0]?.name);
            handleChange(fileRef.current.files[0]);
        }
    }
    const resetFile = () => {
        setFileName("");
        handleChange(null);
        fileRef.current.value = null;
    }

    return (
        <>
            <label htmlFor={name}>
                {!fileName &&
                    <div className={"flex items-center gap-3 cursor-pointer py-4 px-8"}>
                        <img src={fileTake} alt="take file"/>
                        <span className="font-semibold text-purple">
                            Прикрепить файл
                        </span>
                    </div>
                }
                <input
                    id={name}
                    ref={fileRef}
                    type="file"
                    hidden
                    accept=".pdf"
                    onChange={takeFile}
                />
            </label>
            {fileName &&
                <div className={"flex items-center justify-between gap-8 border-2 border-solid border-transparent hover:border-purple shadow-gray-100 py-4 px-8 rounded"}>
                    <div className={"flex items-center gap-2"}>
                        <img src={file} alt="file"/>
                        <span>{fileName}</span>
                    </div>
                    <img
                        src={fileReset}
                        alt="reset file"
                        className={"cursor-pointer"}
                        onClick={resetFile}
                    />
                </div>
            }
        </>
    );
};

export default BaseFile;
