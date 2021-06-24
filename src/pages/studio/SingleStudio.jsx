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
        <div>
            <div className="studio_info_container">
                <div className="imageSub">
                    <img src={photo} alt={`${name}`} />
                    <div className="blackbg"></div>
                    <div className="label"> {name}</div>
                </div>
                <div className="studio_info_div">
                    <p className="info">Hourly rate: {price} $</p>
                    <p className="info">Consultation fee: {consultation} $</p>
                    <p className="info">
                        Location: {city},{country}
                    </p>
                    <p className="info">About Studio : {about}</p>
                    <p className="info">Addresse: {location}</p>
                    <p className="info">Contact: {email}</p>
                </div>
            </div>
            <div className="review_container">
                <p className="headline_reviews">All reviews </p>
                <div>
                    {studio?.reviews?.map((review, index) => (
                        <div className="display_reviews_container" key={index}>
                            <div style={{ paddingLeft: 30 }}>
                                <b>{review.title}</b>
                            </div>
                            <div style={{ padding: 30 }}>{review.body}</div>
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

            <div className="owner_actions">
                {owner === user._id ? (
                    <>
                        <div>
                            <p>Owner Actions</p>
                            <br />
                            <div>
                                <button
                                    className="editStudio_button"
                                    onClick={photoToggle}
                                >
                                    Update Photo
                                </button>{" "}
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
                            <div>
                                <button className="editStudio_button">
                                    <Link
                                        className="link"
                                        to={`${PATHS.STUDIOS}/${props.match.params.studioId}/edit`}
                                    >
                                        Edit Studio
                                    </Link>
                                </button>
                            </div>
                        </div>
                        <div>
                            <button onClick={handleDelete}>
                                Delete Studio
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default SingleStudio;
