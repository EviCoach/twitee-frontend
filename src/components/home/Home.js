import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Home.css";
// import close from "../../close.svg";
// import { transformLayersToAreas } from "../../Utilities/LocationHelper"


export default function Home(props) {

    const navigate = useNavigate();
    const login = (event) => {
      navigate("/login")
    }
    
    const signup = (event) => {
        navigate("/sigup")
    }

    return (
        <div className="close-form-container">
           
            <h1>Welcome to Twitee</h1>
            <div><button onClick={login}>Login</button></div>
            <div><button onClick={signup}>Signup</button></div>
        </div>
    );
}
