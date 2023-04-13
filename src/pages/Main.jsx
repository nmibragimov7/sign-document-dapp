import React from 'react';

const Main = () => {
    return (
        <>
            <h1 className={"text-center text-lg md:text-3xl font-semibold mb-4"}>Электронный документооборот</h1>
            <div className={"md:text-xl text-justify"}>
                <p className={"mb-2"}>
                    Целью децентрализованного приложения является подписание документа сторонами
                    юридического договора, не используя услуги Нотариуса. С помощью смарт-контракта часть
                    данных доступны в открытом доступе для прозрачности участникам договора.
                </p>
                <p>В блокчейн сети доступны <a
                        href={"https://soltau.ru/index.php/themes/dev/item/461-kak-poschitat-kontrolnuyu-summu-crc32-crc16-crc8"}
                        target="_blank"
                        className={"cursor-pointer text-primary-blue hover:text-purple"}
                    >CRC32</a> файла и список подписантов</p>
                <p>В серверной части хранятся файл в формате BASE64, CRC32, инициатор документооборота, список подписантов и hash транзакции</p>
            </div>
        </>
    );
};

export default Main;
