import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

import BaseCart from "../components/shared/BaseCart/BaseCart.jsx";
import {formatDate} from "../core/helpers/date.js";

const Documents = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [documents, setDocuments] = useState(["", "", ""]);
    const fetchDocuments = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("https://sign-document-2f405-default-rtdb.firebaseio.com/documents.json", {
                params: {}
            });
            if(response.status === 200) {
                const data = Object.entries(response.data).map(([id, data]) => ({
                    id,
                    ...data
                }));
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
        fetchDocuments();
    }, []);

    return (
        <>
            <div className={"grid md:grid-cols-3 gap-4"}>
                {documents.map(document => (
                    <BaseCart
                        key={document.id}
                        title={document.name}
                        description={`Дата создания: ${formatDate(document.date, "dd.LL.yyyy HH:mm")}`}
                        action={"Подробнее"}
                        isLoading={isLoading}
                        actionHandler={() => navigate(`/documents/${document.id}`)}
                    />
                ))}
            </div>
        </>
    );
};

export default Documents;
