import React, { useState, useEffect } from "react";
import UpdatePassword from "../components/User/UpdatePassword";
import UpdateProfile from "../components/User/UpdateProfile";
import UpdatePhoto from "../components/User/UpdatePhoto";
import AddStudio from "../components/Studio/AddStudio";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import * as USER_SERVICE from "../services/user.service";
import { Link } from "react-router-dom";

function ProfileUser(props) {
    const [user, setUser] = useState({});

    const { authenticate } = props;

    const [updateProfile, setUpdateProfile] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const [updatePicture, setUpdatePicture] = useState(false);
    const [addStudio, setAddStudio] = useState(false);
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    // console.log("props:", props);
    function profileToggle() {
        setUpdateProfile(!updateProfile);
    }

    function passwordToggle() {
        setUpdatePassword(!updatePassword);
    }

    function photoToggle() {
        setUpdatePicture(!updatePicture);
    }
    function addStudioToggle() {
        setAddStudio(!addStudio);
    }

    useEffect(() => {
        USER_SERVICE.GET_USER(props.match.params.username, accessToken)
            .then((response) => {
                setUser(response.data.user);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [props.match.params.username]);

    return (
        <div>
            <h1> Hi, {user.username}</h1>
            <img
                src={user.photo}
                alt={`${user.username}`}
                style={{ width: "150px" }}
            />
            <p>{user.role}</p>

            <div>
                <br />
                {/* {props.user.role === "Artist" ? (
                    <Link to={}> My Studio</Link>>
                ) : null} */}
                <button onClick={profileToggle}>Edit Profile</button>
                {updateProfile && (
                    <UpdateProfile user={user} authenticate={authenticate} />
                )}
                <br />
                <br />
                <button onClick={photoToggle}>Update Profile Photo</button>
                {updatePicture && (
                    <UpdatePhoto user={user} authenticate={authenticate} />
                )}
                <br />
                <br />
                <button onClick={passwordToggle}>Update Password</button>
                {updatePassword && <UpdatePassword />}
                <br />
                <br />
                {props.user.role === "Artist" ? (
                    <button onClick={addStudioToggle}>Add Studio</button>
                ) : null}
                <br />
                <br />
                {addStudio && (
                    <AddStudio user={user} authenticate={authenticate} />
                )}
                {/* <Link to={PATHS.STUDIO}>Studio Page</Link> */}
                <br />
                <br />
                <br />
                <br />
            </div>
            <Link to={PATHS.STUDIOS}>STUDIOS</Link>
        </div>
    );
}

export default ProfileUser;
