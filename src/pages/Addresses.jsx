import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import BaseTable from "../components/shared/BaseTable/BaseTable.jsx";
import {formatDate} from "../core/helpers/date.js";

const cols = [
    {
        key: "id",
        label: "ID"
    },
    {
        key: "name",
        label: "Наименование файла"
    },
    {
        key: "crc32",
        label: "CRC32"
    },
    {
        key: "date",
        label: "Дата создания",
        render: item => <div>{formatDate(item.date, "dd.LL.yyyy HH:mm")}</div>
    },

];

const Addresses = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [documents, setDocuments] = useState([]);
    const fetchDocuments = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("https://sign-document-2f405-default-rtdb.firebaseio.com/documents.json");
            if(response.status === 200) {
                const data = Object.entries(response.data).map(([id, data]) => ({
                    id,
                    ...data
                })).filter(document => document.initiator === params.hash);
                console.log(data)
                setDocuments(data);
            }
        } catch (error) {
            console.dir(error);
            toast.error("Неизвестная ошибка");
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if(params.hash) {
            fetchDocuments();
        }
    }, [params]);

    return (
        <>
            <h1 className={"text-center text-3xl font-semibold mb-4"}>Список документов, добавленных данным кошельком</h1>
            <BaseTable
                data={documents}
                cols={cols}
                isLoading={isLoading}
            />
        </>
    );
};

export default Addresses;
