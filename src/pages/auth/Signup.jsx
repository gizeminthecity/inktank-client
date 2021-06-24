import React, { useState } from "react";
import { signup } from "../../services/auth";
import "./auth.css";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

export default function Signup(props) {
    const { authenticate, history } = props;

    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        role: "Enthusiast",
    });
    const { username, password, email, role } = form;
    const [error, setError] = useState(null);

    function handleInputChange(event) {
        const { name, value } = event.target;
        return setForm({ ...form, [name]: value });
    }

    function handleFormSubmission(event) {
        // console.log("EVENT: ", event);
        event.preventDefault();

        const credentials = {
            username,
            password,
            email,
            role,
        };
        signup(credentials)
            .then((res) => {
                console.log("RUNNING");
                if (!res.status) {
                    // unsuccessful signup
                    console.error("Signup was unsuccessful: ", res);
                    return setError({
                        message:
                            "Signup was unsuccessful! Please check the console.",
                    });
                }
                // successful signup
                localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
                authenticate(res.data.user);
                history.push(PATHS.HOMEPAGE);
                window.location.reload();
            })
            .catch((err) => console.log(err));
    }

    console.log(form);

    return (
        <div>
            <h1 className="auth_headline">Sign Up</h1>
            <form onSubmit={handleFormSubmission} className="auth__form">
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
                <label htmlFor="input-email"></label>
                <input
                    id="input-email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                    required
                    minLength="8"
                />
                <label htmlFor="input-role"></label>
                <select
                    id="input-role"
                    name="role"
                    onChange={handleInputChange}
                >
                    {CONSTS.USER_ROLE.map((role, index) => (
                        <option key={index}>{role}</option>
                    ))}
                </select>

                <button className="button__submit" type="submit">
                    Sign Up
                </button>
                {error && (
                    <div className="error-block">
                        <p>There was an error submiting the form:</p>
                        <p>{error.message}</p>
                    </div>
                )}
            </form>
        </div>
    );
}
