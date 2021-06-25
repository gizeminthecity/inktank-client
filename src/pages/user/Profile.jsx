import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UpdateProfile from "../../components/User/UpdateProfile";
import UpdatePhoto from "../../components/User/UpdatePhoto";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as USER_SERVICE from "../../services/user.service";
import "./Profile.css";

function Profile(props) {
    const [user, setUser] = useState({});

    const { authenticate } = props;

    const [displayUpdateProfile, setDisplayUpdateProfile] = useState(false);
    const [displayUpdatePhoto, setDisplayUpdatePhoto] = useState(false);

    // console.log("props:", props);
    function profileToggle() {
        setDisplayUpdateProfile(!displayUpdateProfile);
    }

    function photoToggle() {
        setDisplayUpdatePhoto(!displayUpdatePhoto);
    }

    // function updatesStudio(studio) {
    //     setStudio(studio);
    // }

    useEffect(() => {
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        USER_SERVICE.GET_USER(props.match.params.username, accessToken)
            .then((response) => {
                setUser(response.data.user);
            })
            .catch((err) => {
                console.error(err.response);
            });
    }, [props.match.params.username]);

    return (
        <div>
            <section>
                <div>
                    <img
                        className="profile_photo"
                        src={user.photo}
                        alt={`${user.username}`}
                    />
                </div>
                <div>
                    <h1> Hi, {user.username}</h1>

                    <p>{user.role}</p>
                </div>
            </section>
            <section>
                <div>
                    {user._id ? (
                        <button
                            className="profile_button"
                            onClick={photoToggle}
                        >
                            Update Profile Photo
                        </button>
                    ) : null}
                    {displayUpdatePhoto && (
                        <UpdatePhoto
                            user={user}
                            authenticate={authenticate}
                            selfDestruct={photoToggle}
                        />
                    )}
                </div>
                <div>
                    {user._id ? (
                        <button
                            className="profile_button"
                            onClick={profileToggle}
                        >
                            Edit Profile
                        </button>
                    ) : null}
                    {displayUpdateProfile && (
                        <UpdateProfile
                            user={user}
                            authenticate={authenticate}
                            setUser={setUser}
                            selfDestruct={profileToggle}
                            key={user}
                        />
                    )}
                </div>
                <div className="profile_link_container">
                    {props.user.role === "Artist" ? (
                        <>
                            <div className="link_containers">
                                <Link
                                    className="profile_link"
                                    to={PATHS.ADD_STUDIO}
                                >
                                    Add Studio
                                </Link>
                            </div>
                            <br></br>
                            <div className="link_containers">
                                <Link
                                    className="profile_link"
                                    to={PATHS.ADD_WORK}
                                >
                                    Add work
                                </Link>
                            </div>
                            <br></br>

                            <div className="link_containers">
                                <Link
                                    className="profile_link"
                                    to={`${PATHS.WORKS}/${props.user.username}`}
                                >
                                    My Works
                                </Link>
                            </div>
                            <br></br>
                        </>
                    ) : null}
                </div>
            </section>

            <div>
                <br />
                {/* {props.user.role === "Artist" ? (
                    <Link to={}> My Studio</Link>>
                ) : null} */}
            </div>
        </div>
    );
}

export default Profile;
