import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import * as CONSTS from "../../utils/consts";
import AddReview from "../../components/Review/AddReview";
import UpdateStudioPhoto from "../../components/Studio/UpdateStudioPhoto";
import * as PATHS from "../../utils/paths";
import * as STUDIO_SERVICE from "../../services/studio.service";
import "./SingleStudio.css";

function SingleStudio(props) {
    const { user, authenticate } = props;
    const [studio, setStudio] = useState({});
    const [updatePicture, setUpdatePicture] = useState(false);

    function updatesStudio(studio) {
        setStudio(studio);
    }

    function photoToggle() {
        setUpdatePicture(!updatePicture);
    }

    useEffect(() => {
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        STUDIO_SERVICE.GET_STUDIO(props.match.params.studioId, accessToken)
            .then((response) => {
                console.log("response:", response);
                setStudio(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [props.match.params.studioId]);

    function handleDelete(event) {
        event.preventDefault();
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
        STUDIO_SERVICE.DELETE(accessToken, studio._id)
            .then(() => {
                props.history.push(`/`);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const {
        email,
        name,
        owner,
        about,
        city,
        country,
        location,
        price,
        consultation,
        photo,
    } = studio;

    const [addReview, setAddReview] = useState(false);

    function reviewToggle() {
        setAddReview(!addReview);
    }

    function photoToggle() {
        setUpdatePicture(!updatePicture);
    }
    return (
        <div className="page_container">
            <section className="section_top">
                <div className="imageSub">
                    <img src={photo} alt={`${name}`} className="studio_photo" />
                    <div className="blackbg"></div>
                </div>
                <div className="owner_actions">
                    <div className="label">
                        <b>{name}</b>
                    </div>
                    {owner === user._id ? (
                        <>
                            <div>
                                <Link
                                    className="link"
                                    to={`${PATHS.STUDIOS}/${props.match.params.studioId}/edit`}
                                >
                                    Edit Studio
                                </Link>
                            </div>
                            <div>
                                <button
                                    className="update_photo_button"
                                    onClick={photoToggle}
                                >
                                    Update Photo
                                </button>
                            </div>
                        </>
                    ) : null}
                </div>
                <div className="update_photo">
                    {updatePicture && (
                        <UpdateStudioPhoto
                            user={user}
                            authenticate={authenticate}
                            studio={studio}
                            setStudio={setStudio}
                            updatesStudio={updatesStudio}
                            selfDestruct={photoToggle}
                        />
                    )}
                </div>
            </section>
            <section className="section_bottom">
                <div className="studio_info_container">
                    <div className="studio_info_div">
                        <div className="one">
                            <p>
                                <b>Intro</b>
                            </p>{" "}
                            <p className="info">
                                From {city},{country}
                            </p>
                            <p>
                                <b>About</b>
                            </p>
                            <p className="info">{about}</p>{" "}
                            <p>
                                <b>Other</b>
                            </p>
                            <p>Please contanct me by email</p>
                        </div>
                        <div className="two">
                            <p>
                                <b>Fee</b>
                            </p>{" "}
                            <p className="info">
                                Consultation fee {consultation} $
                            </p>
                            <p className="info">Hourly rate {price} $</p>{" "}
                            <p>
                                <b>Contact</b>
                            </p>
                            <p className="info">{location}</p>
                            <p className="info">{email}</p>
                        </div>
                    </div>
                </div>{" "}
                <div className="review_container">
                    <div className="review_section">
                        {studio?.reviews?.map((review, index) => (
                            <div
                                className="display_reviews_container"
                                key={index}
                            >
                                {" "}
                                <div>
                                    {" "}
                                    <div>
                                        <b>{review.title}</b>
                                    </div>
                                    <div style={{ paddingTop: 10 }}>
                                        {review.body}
                                    </div>
                                </div>
                            </div>
                        ))}{" "}
                    </div>{" "}
                    <div>
                        <div className="add_review_butt">
                            {user ? (
                                <button
                                    className="add_review_button"
                                    onClick={reviewToggle}
                                >
                                    Add review
                                </button>
                            ) : null}{" "}
                            {addReview && (
                                <AddReview
                                    className="add_review_component"
                                    studio={studio}
                                    setStudio={setStudio}
                                    user={user}
                                    authenticate={authenticate}
                                    studioId={studio._id}
                                    updatesStudio={updatesStudio}
                                    selfDestruct={reviewToggle}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {owner === user._id ? (
                <div>
                    <button className="delete_button" onClick={handleDelete}>
                        Delete Studio
                    </button>
                </div>
            ) : null}
        </div>
    );
}

export default SingleStudio;
