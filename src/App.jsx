import {RouterProvider} from "react-router-dom";
import {configureChains, createClient, WagmiConfig} from "wagmi";
import {bscTestnet} from "@wagmi/chains";
import {Web3Modal} from "@web3modal/react";
import {EthereumClient, w3mConnectors, w3mProvider,} from "@web3modal/ethereum";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import router from "./pages/index.jsx";
import {WALLET_CONNECT_ID} from "./core/contants/index.js";

const projectId = WALLET_CONNECT_ID;
let chains = [bscTestnet];
const {provider} = configureChains(chains, [w3mProvider({projectId})]);
const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({projectId, version: 1, chains}),
    provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {

    return (
        <>
            <WagmiConfig client={wagmiClient}>
                <RouterProvider router={router}/>
            </WagmiConfig>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={true}
                closeButton={false}
                theme={"colored"}
                className={"text-center"}
            />
        </>
    )
}

export default App;
