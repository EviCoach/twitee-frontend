import React, { useContext } from "react";
import axios from 'axios';
import "./LoginForm.css";
import { UserContext } from "../../UserContext";
import { useLocation, useNavigate } from "react-router-dom";
// import close from "../../close.svg";
// import { transformLayersToAreas } from "../../Utilities/LocationHelper"

const mainAxios = axios.create({
    baseURL: 'http://localhost:5000/'
});

export default function LoginForm(props) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(false);

    const loginUser = async (payload) => {
        let data = null;
        try {
            const response = await mainAxios.post('/api/auth/login', payload);
            console.log("Response is ", response.data);
            data = response.data.data;

        } catch (err) {
            console.log(err);
        }
        return data;

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await loginUser({ email, password });
        data.loggedIn = true;
        setUser(data);
        console.log("user is ", user);
        if (location.state?.from) {
            console.log("navigating to: ", location.state.from);
            navigate(location.state.from);
        } else {
            navigate('/posts')
        }
    }

    return (
        <div className="close-form-container">
            {/* <img src={close} alt="logo" className="close-form"
                width={20} height={20} onClick={props.handler} /> */}
            <form className="LoginForm" onSubmit={handleSubmit}>
                <h1>Login</h1>

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

                <button>Login</button>
            </form>
        </div>
    );
}
