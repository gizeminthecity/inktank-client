import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";

const Navbar = (props) => {
    return (
        <nav>
            <Link to="/" className="nav__projectName">
                Inktank
            </Link>
            <Link to={PATHS.PROFILE_ARTIST}>Profile</Link>
            <Link to={PATHS.EXPLORE}>Explore</Link>
            <Link to={PATHS.ARTISTS}>Artists</Link>

            <div className="nav__authLinks">
                {props.user ? (
                    <>
                        <Link to="/protected" className="authLink">
                            Protected Page
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
                        <Link to="/auth/signup" className="authLink">
                            Signup
                        </Link>
                        <Link to="/auth/login" className="authLink">
                            Log In
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
