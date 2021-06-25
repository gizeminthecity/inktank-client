import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import "./Homepage.css";

function HomePage(props) {
    return (
        <div className="homePage">
            <div>
                <img
                    className="bistro"
                    src="https://res.cloudinary.com/gizemella/image/upload/v1624625927/inktank/2019-10-19_14.13.08_em6f1a.jpg"
                />
            </div>
            {/* <div className="homepage_links">
                <Link className="homeLink" to={`${PATHS.SIGNUPPAGE}`}>
                    Sign Up
                </Link>
                <p>or</p>
                <Link className="homeLink" to={`${PATHS.LOGINPAGE}`}>
                    Login
                </Link>
            </div> */}
        </div>
    );
}

export default HomePage;
