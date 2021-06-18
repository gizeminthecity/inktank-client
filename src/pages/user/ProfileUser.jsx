import React, { useState, useEffect } from "react";
import UpdatePassword from "../../components/User/UpdatePassword";
import UpdateProfile from "../../components/User/UpdateProfile";
import UpdatePhoto from "../../components/User/UpdatePhoto";
import AddStudio from "../../components/Studio/AddStudio";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as USER_SERVICE from "../../services/user.service";
import { Link } from "react-router-dom";

function ProfileUser(props) {
    const [user, setUser] = useState({});

    const { authenticate } = props;

    const [displayUpdateProfile, setDisplayUpdateProfile] = useState(false);
    const [displayUpdatePassword, setDisplayUpdatePassword] = useState(false);
    const [displayUpdatePhoto, setDisplayUpdatePhoto] = useState(false);
    const [displayAddStudio, setDisplayAddStudio] = useState(false);
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    // console.log("props:", props);
    function profileToggle() {
        setDisplayUpdateProfile(!displayUpdateProfile);
    }

    function passwordToggle() {
        setDisplayUpdatePassword(!displayUpdatePassword);
    }

    function photoToggle() {
        setDisplayUpdatePhoto(!displayUpdatePhoto);
    }
    function addStudioToggle() {
        setDisplayAddStudio(!displayAddStudio);
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
                {displayUpdateProfile && (
                    <UpdateProfile user={user} authenticate={authenticate} />
                )}
                <br />
                <br />
                <button onClick={photoToggle}>Update Profile Photo</button>
                {displayUpdatePhoto && (
                    <UpdatePhoto user={user} authenticate={authenticate} />
                )}
                <br />
                <br />
                <button onClick={passwordToggle}>Update Password</button>
                {displayUpdatePassword && <UpdatePassword />}
                <br />
                <br />
                {props.user.role === "Artist" ? (
                    <button onClick={addStudioToggle}>Add Studio</button>
                ) : null}
                <br />
                <br />
                {displayAddStudio && (
                    <AddStudio user={user} authenticate={authenticate} />
                )}
                {/* <Link to={PATHS.STUDIO}>Studio Page</Link> */}

                <br />
                <br />
            </div>
        </div>
    );
}

export default ProfileUser;
