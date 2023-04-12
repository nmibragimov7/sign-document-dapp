import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";

import Layout from "../layouts/Layout.jsx";
import Main from "./Main.jsx";
import Adding from "./Adding.jsx";
import Documents from "./Documents.jsx";
import Detail from "./Detail.jsx";
import NotFound from "./NotFound.jsx";
import Addresses from "./Addresses.jsx";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path={"/"} element={<Layout/>}>
            <Route index element={<Main/>}/>
            <Route path={"/documents"} element={<Documents/>}/>
            <Route path={"/adding"} element={<Adding/>}/>
            <Route path={"/addresses/:hash"} element={<Addresses/>}/>
            <Route path={"/documents/:id"} element={<Detail/>}/>
            <Route path="*" element={<NotFound/>} />
        </Route>
    </>
));

export default router;
