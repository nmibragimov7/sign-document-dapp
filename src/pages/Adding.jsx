import React, {useEffect, useState} from 'react';
import {useAccount, useSigner} from "wagmi";
import {ethers} from "ethers";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {
    ABI,
    CONTRACT_ADDRESS
} from "../core/contants";
import BaseInput from "../components/shared/BaseInput/BaseInput.jsx";
import BaseButton from "../components/shared/BaseButton/BaseButton.jsx";
import BaseFile from "../components/shared/BaseFile/BaseFile.jsx";
import BaseCheckbox from "../components/shared/BaseCheckbox/BaseCheckbox.jsx";
import {crc32} from "../core/helpers/crc32.js";
import close from "../assets/close.svg";

const Adding = () => {
    const navigate = useNavigate();
    const [formik, setFormik] = useState({
        name: "",
        url: "",
        crc32: "",
        addresses: [""]
    });
    const [contract, setContract] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const {data: signer} = useSigner();
    const {address, isConnected} = useAccount();
    const createDocument = async (hash) => {
        try {
            setIsLoading(true);
            let data = {
                ...formik,
                crc32: String(formik.crc32),
                addresses: formik.addresses.filter(address => !!address).map(_ => ({
                    address: _,
                    hash: ""
                })),
                hash,
                initiator: address,
                date: new Date()
            };
            if(isAgreed) {
                data.addresses.push({
                    address,
                    hash: ""
                });
            }
            if(!isAgreed && !data.addresses.length) {
                return;
            }

            const response = await axios.post("https://sign-document-2f405-default-rtdb.firebaseio.com/documents.json", data);
            if(response.status === 200) {
                toast.success(`Хэш транзакции: ${hash}`);
                navigate("/documents");
            }
        } catch (error) {
            console.dir(error);
            toast.error("Неизвестная ошибка");
        } finally {
            setIsLoading(false);
        }
    }
    const addDocument = async () => {
        if(!formik.crc32) {
            toast.error("Прикрепите файл");
            return;
        }

        try {
            setIsLoading(true);
            const WAIT_BLOCK_CONFIRMATIONS = 1;
            let addresses = formik.addresses.filter(address => !!address);
            if(isAgreed) {
                addresses.push(address);
            }
            if(!isAgreed && !addresses.length) {
                toast.error("Добавьте адрес кошелька");
                return;
            }
            const tx = await contract.createDoc(String(formik.crc32), [...addresses]);
            console.log(`approve: ${tx.hash}`);
            await signer.provider.waitForTransaction(
                tx.hash,
                WAIT_BLOCK_CONFIRMATIONS
            );
            await createDocument(tx.hash);
        } catch (error) {
            console.dir(error);
            toast.error(error?.reason || "Неизвестная ошибка");
        } finally {
            setIsLoading(false);
        }
    };
    const inputHandler = (idx, event) => {
        const addresses = formik.addresses;
        addresses[idx] = event.target.value;
        setFormik((prev) => {
            return {
                ...prev,
                addresses
            }
        });
    }
    const addAddress = () => {
        let addresses = formik.addresses;
        addresses.push("");
        setFormik((prev) => {
            return {
                ...prev,
                addresses
            }
        });
    }
    const removeAddress = (idx) => {
        let addresses = formik.addresses;
        if(addresses.length > 1) {
            addresses.splice(idx, 1);
            setFormik((prev) => {
                return {
                    ...prev,
                    addresses
                }
            });
        }
    }
    const setField = (key, value) => {
        setFormik((prev) => {
            return {
                ...prev,
                [key]: value
            }
        });
    }
    const fileHandler = (file) => {
        if (!file) {
            setField("name", "");
            setField("url", "");
            setField("crc32", "");
            return;
        }
        setField("name", file.name);

        return new Promise(function (resolve, reject) {
            let reader = new FileReader();
            reader.onload = function (evt) {
                resolve(evt.target.result);
            }
            reader.readAsDataURL(file);
            reader.onerror = reject;
        }).then(response => {
            setField("url", response);
            setField("crc32", crc32(response));
        })
    }
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

    if (!isConnected) {
        return <p className={"text-center uppercase md:text-2xl text-red font-bold"}>для добавления документа подключите кошелек</p>;
    }

    return (
        <>
            <div className={"max-w-4xl mx-auto flex flex-col gap-4"}>
                <div className={"flex justify-center mb-4"}>
                    <BaseFile
                        name={"file"}
                        handleChange={fileHandler}
                    />
                </div>
                <div className={"flex gap-2"}>
                    <BaseInput
                        name={`address`}
                        placeholder={"Введите адрес кошелька..."}
                        value={address}
                        readonly
                    />
                    <BaseButton className={"max-w-xs"} onClick={addAddress}>Добавить адрес</BaseButton>
                </div>
                {formik.addresses.map((address, idx) => (
                    <div key={idx} className={"flex gap-2"}>
                        <BaseInput
                            name={`address-${idx}`}
                            placeholder={"0x0000000000000000000000000000000000000000"}
                            value={address}
                            onChange={(event) => inputHandler(idx, event)}
                        />
                        <img
                            src={close}
                            alt="close"
                            className={"cursor-pointer p-2"}
                            onClick={() => removeAddress(idx)}
                        />
                    </div>
                ))}
                <BaseCheckbox
                    name={"isAgreed"}
                    value={isAgreed}
                    setValue={setIsAgreed}
                >
                    добавить инициатора в качестве подписанта
                </BaseCheckbox>
                <BaseButton disabled={isLoading} onClick={addDocument}>
                    Добавить документ
                </BaseButton>
            </div>
        </>
    );
};

export default Adding;
