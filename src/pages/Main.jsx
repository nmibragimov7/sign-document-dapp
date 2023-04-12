import React from 'react';

const Main = () => {
    return (
        <>
            <h1 className={"text-center text-3xl font-semibold mb-4"}>Электронный документооборот</h1>
            <div className={"text-xl"}>
                <p className={"mb-2"}>
                    Целью децентрализованного приложения является подписание документа сторонами участников
                    какого-либо договора, не прибегая к помощи услуг Нотариуса. С помощью смарт-контракта часть
                    данных доступны в открытом доступе для прозрачности для участников договора.
                </p>
                <div className={"ml-4"}>
                    <p> - В блокчейн сети доступны <a
                            href={"https://soltau.ru/index.php/themes/dev/item/461-kak-poschitat-kontrolnuyu-summu-crc32-crc16-crc8"}
                            target="_blank"
                            className={"cursor-pointer text-primary-blue hover:text-purple"}
                        >CRC32</a> файла, адрес инициатор документооборота и список подписантов</p>
                    <p> - В серверной части хранятся файл в формате BASE64 и CRC32, инициатор документооборота, список подписантов, статус подписанного документа</p>
                </div>
            </div>
        </>
    );
};

export default Main;
