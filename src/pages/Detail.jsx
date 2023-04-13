import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {useAccount, useSigner} from "wagmi";
import {ethers} from "ethers";

import BaseButton from "../components/shared/BaseButton/BaseButton.jsx";
import BaseSkeleton from "../components/shared/BaseSkeleton/BaseSkeleton.jsx";
import {formatDate} from "../core/helpers/date.js";
import {ABI, CONTRACT_ADDRESS} from "../core/contants/index.js";

const Detail = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSign, setIsLoadingSign] = useState(false);
    const [data, setData] = useState(null);
    const [contract, setContract] = useState(undefined);
    const {data: signer} = useSigner();
    const {address, isConnected} = useAccount();
    const fetchDocument = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://sign-document-2f405-default-rtdb.firebaseio.com/documents/${params.id}.json/`);
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.dir(error);
            toast.error("Неизвестная ошибка");
        } finally {
            setIsLoading(false);
        }
    }
    const download = () => {
        if (data) {
            const link = document.createElement('a');
            link.href = data.url;
            link.download = data.name;
            link.click();
        }
    }
    const updateDocument = async (hash) => {
        try {
            setIsLoadingSign(true);
            const singers = data.addresses.map(singer => {
                if (singer.address === address) {
                    singer.hash = hash;
                }

                return singer;
            });
            let body = {
                addresses: singers,
                crc32: data.crc32,
                date: data.date,
                hash: data.hash,
                initiator: data.initiator,
                name: data.name,
                url: data.url,
            };

            const response = await axios.put(`https://sign-document-2f405-default-rtdb.firebaseio.com/documents/${params.id}.json/`, body);
            if (response.status === 200) {
                toast.success(`Хэш транзакции: ${hash}`);
            }
        } catch (error) {
            console.dir(error);
            toast.error("Неизвестная ошибка");
        } finally {
            setIsLoadingSign(false);
        }
    }
    const signDocument = async () => {
        try {
            setIsLoadingSign(true);
            const WAIT_BLOCK_CONFIRMATIONS = 1;
            const tx = await contract.signDoc(String(data.crc32));
            console.log(`approve: ${tx.hash}`);
            await signer.provider.waitForTransaction(
                tx.hash,
                WAIT_BLOCK_CONFIRMATIONS
            );
            await updateDocument(tx.hash);
        } catch (error) {
            console.dir(error);
            toast.error(error?.reason || "Неизвестная ошибка");
        } finally {
            setIsLoadingSign(false);
        }
    }
    const cutText = (text, length = 41) => {
        if (text && text.length) {
            return text.substring(0, length) + "...";
        }
        return text;
    }
    useEffect(() => {
        if (params.id) {
            fetchDocument();
        }
    }, [params]);
    useEffect(() => {
        if (signer && isConnected) {
            const documentContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                ABI,
                signer
            );
            setContract(documentContract);
        }
    }, [signer, isConnected]);

    return (
        <>
            {!isLoading && (
                <div className={"max-w-3xl flex flex-col gap-2 mx-auto"}>
                    <div className={"flex flex-col md:flex-row md:gap-2"}>
                        <span className={"font-semibold"}>Инициатор: </span>
                        <Link
                            to={`/addresses/${data?.initiator}`}
                            className={"md:hidden cursor-pointer font-semibold text-green hover:text-purple"}
                        >
                            {cutText(data?.initiator)}
                        </Link>
                        <Link
                            to={`/addresses/${data?.initiator}`}
                            className={"hidden md:block cursor-pointer font-semibold text-green hover:text-purple"}
                        >
                            {data?.initiator}
                        </Link>
                    </div>
                    <div className={"flex flex-col md:flex-row md:gap-2"}>
                        <span className={"font-semibold"}>Дата создания: </span>
                        <span>{formatDate(data?.date, "dd.LL.yyyy HH:mm")}</span>
                    </div>
                    <div className={"flex flex-col md:flex-row md:gap-2"}>
                        <span className={"font-semibold"}>Hash транзакции: </span>
                        <a
                            href={`https://testnet.bscscan.com/tx/${data?.hash}`}
                            target="_blank"
                            className={"md:hidden cursor-pointer text-primary-blue hover:text-purple"}
                        >{cutText(data?.hash, 45)}</a>
                        <a
                            href={`https://testnet.bscscan.com/tx/${data?.hash}`}
                            target="_blank"
                            className={"hidden md:block cursor-pointer text-primary-blue hover:text-purple"}
                        >{data?.hash}</a>
                    </div>
                    <div className={"flex flex-col md:flex-row md:gap-2"}>
                        <span className={"font-semibold"}>Наименование файла: </span>
                        <span>{data?.name}</span>
                    </div>
                    <div className={"flex flex-col md:flex-row md:gap-2"}>
                        <span className={"font-semibold"}>CRC32: </span>
                        <span>{data?.crc32}</span>
                    </div>
                    <div className={"mb-4"}>
                        <p className={"font-semibold"}>Подписанты: </p>
                        {data?.addresses.map((signer, idx) => (
                            <div key={signer.address} className={"ml-4 md:ml-0"}>
                                <div className={"flex items-center gap-4"}>
                                    <span className={"text-xl hidden md:block"}>{idx + 1}.</span>
                                    <div className={"mb-4"}>
                                        <div className={"flex flex-col md:flex-row md:gap-2"}>
                                            <span className={"font-semibold"}>адрес кошелька: </span>
                                            <a
                                                href={`https://testnet.bscscan.com/address/${signer.address}`}
                                                target="_blank"
                                                className={"md:hidden cursor-pointer text-primary-blue hover:text-purple"}
                                            >{cutText(signer.address, 35)}</a>
                                            <a
                                                href={`https://testnet.bscscan.com/address/${signer.address}`}
                                                target="_blank"
                                                className={"hidden md:block cursor-pointer text-primary-blue hover:text-purple"}
                                            >{signer.address}</a>
                                        </div>
                                        <div className={"flex flex-col md:flex-row md:gap-2"}>
                                            <span className={"font-semibold"}>hash транзакции: </span>
                                            {signer.hash ? (
                                                <>
                                                    <a
                                                        href={`https://testnet.bscscan.com/tx/${data?.hash}`}
                                                        target="_blank"
                                                        className={"md:hidden cursor-pointer text-primary-blue hover:text-purple"}
                                                    >{cutText(signer.hash, 35)}</a>
                                                    <a
                                                        href={`https://testnet.bscscan.com/tx/${data?.hash}`}
                                                        target="_blank"
                                                        className={"hidden md:block cursor-pointer text-primary-blue hover:text-purple"}
                                                    >{signer.hash}</a>
                                                </>
                                            ) : <span>{signer.hash}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"flex gap-2"}>
                        <BaseButton
                            disabled={!data}
                            onClick={download}
                        >Скачать документ</BaseButton>
                        <BaseButton
                            disabled={!data || !isConnected || isLoadingSign}
                            className={"!bg-purple"}
                            onClick={signDocument}
                        >Подписать</BaseButton>
                    </div>
                </div>
            )}
            {isLoading && (
                <div className={"max-w-3xl mx-auto"}>
                    <BaseSkeleton className={"h-[360px]"}/>
                </div>
            )}
        </>
    );
};

export default Detail;
