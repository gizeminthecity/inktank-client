import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";

const Navbar = (props) => {
    return (
        <nav>
            <div>
                <Link to={PATHS.HOMEPAGE} className="nav__projectName">
                    FOTOTANK
                </Link>
            </div>
            {props.user ? (
                <>
                    <div>
                        <Link to={PATHS.EXPLORE} className="authLink">
                            EXPLORE
                        </Link>
                    </div>
                    <div>
                        <Link to={PATHS.STUDIOS} className="authLink">
                            STUDIOS
                        </Link>
                    </div>
                </>
            ) : null}

            <div className="nav__authLinks">
                {props.user ? (
                    <>
                        <Link
                            to={`${PATHS.USER}/${props.user.username}`}
                            className="authLink"
                        >
                            PROFILE
                        </Link>
                        <button
                            className="nav-logoutbtn"
                            onClick={props.handleLogout}
                        >
                            Logout
                        </button>
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
