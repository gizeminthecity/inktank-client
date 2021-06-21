import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UpdatePassword from "../../components/User/UpdatePassword";
import UpdateProfile from "../../components/User/UpdateProfile";
import UpdatePhoto from "../../components/User/UpdatePhoto";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as USER_SERVICE from "../../services/user.service";
import LikeButton from "../../components/Work/LikeButton";
import WorkReview from "../../components/Work/'WorkReview";

function Profile(props) {
    const [user, setUser] = useState({});
    const [addReview, setAddReview] = useState(false);

    console.log(user);

    const { authenticate } = props;

    const [displayUpdateProfile, setDisplayUpdateProfile] = useState(false);
    const [displayUpdatePassword, setDisplayUpdatePassword] = useState(false);
    const [displayUpdatePhoto, setDisplayUpdatePhoto] = useState(false);

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
    function reviewToggle() {
        setAddReview(!addReview);
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
            <h1> Hi, {user.username}</h1>
            <img
                src={user.photo}
                alt={`${user.username}`}
                style={{ width: "150px" }}
            />
            <p>{user.role}</p>

            <div>
                <h3>My Works</h3>

                {user.works?.map((work) => {
                    return (
                        <>
                            <section key={work._id}>
                                <Link to={`${PATHS.WORKS}/${work._id}`}>
                                    <img
                                        src={work.photo}
                                        alt="Artists img"
                                        style={{ width: "150px" }}
                                    />
                                    <br />
                                    <div> {work.caption}</div>{" "}
                                    <LikeButton
                                        {...props}
                                        work={work}
                                        workId={work._id}
                                    />
                                </Link>
                                {user ? (
                                    <button onClick={reviewToggle}>
                                        Add review
                                    </button>
                                ) : null}
                                {addReview && (
                                    <WorkReview
                                        work={work}
                                        user={user}
                                        authenticate={authenticate}
                                        workId={work._id}
                                        selfDestruct={reviewToggle}
                                    />
                                )}
                            </section>
                        </>
                    );
                })}
            </div>
            <div>
                <br />
                {/* {props.user.role === "Artist" ? (
                    <Link to={}> My Studio</Link>>
                ) : null} */}
                <button onClick={profileToggle}>Edit Profile</button>
                {displayUpdateProfile && (
                    <UpdateProfile
                        user={user}
                        authenticate={authenticate}
                        setUser={setUser}
                        selfDestruct={profileToggle}
                        key={user}
                    />
                )}
                <br />
                <br />

                <button onClick={photoToggle}>Update Profile Photo</button>
                {displayUpdatePhoto && (
                    <UpdatePhoto
                        user={user}
                        authenticate={authenticate}
                        selfDestruct={photoToggle}
                    />
                )}
                <br />
                <br />
                {/* <button onClick={passwordToggle}>Update Password</button>
                {displayUpdatePassword && <UpdatePassword />} */}
                {props.user.role === "Artist" ? (
                    <>
                        <div>
                            <Link to={PATHS.ADD_STUDIO}>Add Studio</Link>
                        </div>
                        <div>
                            <Link to={PATHS.ADD_WORK}>Add work</Link>
                        </div>
                    </>
                ) : null}
                <br />
                <br />

                <br />
                <br />
                <br />
            </div>
        </div>
    );
}

export default Profile;
