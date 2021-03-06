import React, { useState } from "react";
import { login } from "../../services/auth";
import "./Signup";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import "./auth.css";

export default function LogIn({ authenticate, history }) {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const { username, password } = form;
    const [error, setError] = useState(null);

    function handleInputChange(event) {
        const { name, value } = event.target;

        return setForm({ ...form, [name]: value });
    }

    function handleFormSubmission(event) {
        event.preventDefault();

        const credentials = {
            username,
            password,
        };
        login(credentials).then((res) => {
            if (!res.status) {
                return setError({
                    message: "Wrong credentials. Please try once again.",
                });
            }
            localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
            authenticate(res.data.user);
            history.push(PATHS.HOMEPAGE);
        });
    }

    return (
        <div>
            <h1 className="auth_headline">Log In</h1>
            <form onSubmit={handleFormSubmission} className="signup__form">
                <label htmlFor="input-username"></label>
                <input
                    id="input-username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="input-password"></label>
                <input
                    id="input-password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleInputChange}
                    required
                    minLength="8"
                />

                {error && (
                    <div className="error-block">
                        <p>{error.message}</p>
                    </div>
                )}

                <button className="button__submit" type="submit">
                    Log In
                </button>
            </form>
        </div>
    );
}
