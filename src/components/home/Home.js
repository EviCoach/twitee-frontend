import React from "react";
import axios from 'axios';
import "./Home.css";
// import close from "../../close.svg";
// import { transformLayersToAreas } from "../../Utilities/LocationHelper"

const mainAxios = axios.create({
    baseURL: 'http://localhost:5000/'
});

export default function Home(props) {
  

    return (
        <div className="close-form-container">
            {/* <img src={close} alt="logo" className="close-form"
                width={20} height={20} onClick={props.handler} /> */}
           THIS IS THE HOME
        </div>
    );
}
