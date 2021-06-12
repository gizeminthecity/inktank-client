import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {
    return (
        <nav>
            <Link to={PATHS.HOMEPAGE} className="nav__projectName">
                {CONSTS.CAPITALIZED_APP}
            </Link>
            <Link to={PATHS.EXPLORE}>Explore</Link>
            <Link to={PATHS.ARTISTS}>Artists</Link>

            <div className="nav__authLinks">
                {props.user ? (
                    <>
                        <button
                            className="nav-logoutbtn"
                            onClick={props.handleLogout}
                        >
                            Logout
                        </button>

                        <Link to={PATHS.PROFILE_USER} className="authLink">
                            Hey {props.user.username}!
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to={PATHS.SIGNUPPAGE} className="authLink">
                            Signup
                        </Link>
                        <Link to={PATHS.LOGINPAGE} className="authLink">
                            Log In
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
