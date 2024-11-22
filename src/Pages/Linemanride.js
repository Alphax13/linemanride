import React, { useRef } from "react";
import Menubar from "../Components/Menubar";
import Bannercode from "../Components/Bannercode";
import MyBarStore from "../Components/MyBarStore";
import { useLocation } from 'react-router-dom';

function Code() {
    const location = useLocation();
    const { response } = location.state || {};
    

    return (
        <>
            <Menubar />
            <Bannercode response={response}/>
            <MyBarStore />
        </>
    );
}

export default Code;
