export const WALLET_CONNECT_ID = "2ab92fd55f78fd5fe06343086a5985e2";
export const ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_docHash",
                "type": "string"
            },
            {
                "internalType": "address[]",
                "name": "shouldSigners",
                "type": "address[]"
            }
        ],
        "name": "createDoc",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "DocSigned",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_docHash",
                "type": "string"
            }
        ],
        "name": "signDoc",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "signers",
                "type": "address[]"
            }
        ],
        "name": "Signers",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_docHash",
                "type": "string"
            }
        ],
        "name": "allSigned",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_docHash",
                "type": "string"
            }
        ],
        "name": "allSigners",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "signer",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "signed",
                        "type": "bool"
                    }
                ],
                "internalType": "struct SignedDoc.Signer[]",
                "name": "shouldSigners",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
export const CONTRACT_ADDRESS = "0x296EbFDc02E1429757d2F3FEC75041C971CE6A15";
