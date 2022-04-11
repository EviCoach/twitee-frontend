import React, { useContext } from "react";
import axios from 'axios';
import "./RegisterForm.css";
import { UserContext } from "../../UserContext";
// import close from "../../close.svg";
// import { transformLayersToAreas } from "../../Utilities/LocationHelper"

const mainAxios = axios.create({
    baseURL: 'http://localhost:5000/'
});


export default function RegisterForm(props) {
    const {user, setUser} = useContext(UserContext);
    // const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(false);

    const registerUser = async (payload) => {
        mainAxios.post('/api/auth/signup', payload)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await registerUser({email,password});
    }

    return (
        <div className="close-form-container">
            {/* <img src={close} alt="logo" className="close-form"
                width={20} height={20} onClick={props.handler} /> */}
            <form className="RegisterForm" onSubmit={handleSubmit}>
                <h1>Signup</h1>
{/* 
                <label>
                    Name:
                    <input
                        name="name"
                        type="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required />
                </label> */}

                <label>
                    Email:
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required />
                </label>
                <label>
                    Password:
                    <input
                        name="password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        required />
                </label>

                <button>Signup</button>
            </form>
        </div>
    );
}
