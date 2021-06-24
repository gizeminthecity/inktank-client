import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {
    return (
        <nav>
            <div>
                <Link to={PATHS.HOMEPAGE} className="nav__projectName">
                    {CONSTS.CAPITALIZED_APP}
                </Link>
            </div>
            <div>
                <Link to={PATHS.EXPLORE} className="authLink">
                    Explore
                </Link>
            </div>
            <div>
                <Link to={PATHS.STUDIOS} className="authLink">
                    Studios
                </Link>
            </div>

            <div className="nav__authLinks">
                {props.user ? (
                    <>
                        {/* <Link to={PATHS.ARTISTS}>Artists</Link> */}

                        <Link
                            to={`${PATHS.USER}/${props.user.username}`}
                            className="authLink"
                        >
                            Profile
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
