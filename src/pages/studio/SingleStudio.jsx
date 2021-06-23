import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import * as CONSTS from "../../utils/consts";
import AddReview from "../../components/Review/AddReview";
import UpdateStudioPhoto from "../../components/Studio/UpdateStudioPhoto";
import * as PATHS from "../../utils/paths";
import * as STUDIO_SERVICE from "../../services/studio.service";

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
            <h2>Studio Name: {name}</h2>
            <p>
                Location: {city},{country}
            </p>
            <p> Studio belongs to {owner}</p>
            <p>About: {about}</p>
            <p>Addresse: {location}</p>
            <p>Hourly rate: {price}</p>
            <p>Consultation fee: {consultation}</p>
            <img src={photo} alt={`${name}`} style={{ width: "150px" }} />
            <br />
            {owner === user._id ? (
                <div>
                    <button onClick={photoToggle}>Update Photo</button>
                    <br />

                    <br />
                    <Link
                        to={`${PATHS.STUDIOS}/${props.match.params.studioId}/edit`}
                    >
                        Edit Studio
                    </Link>
                    <button onClick={handleDelete}>Delete Studio</button>
                    <br />
                </div>
            ) : null}
            <br />
            <br />
            {user ? <button onClick={reviewToggle}>Add review</button> : null}
            {addReview && (
                <AddReview
                    studio={studio}
                    setStudio={setStudio}
                    user={user}
                    authenticate={authenticate}
                    studioId={studio._id}
                    updatesStudio={updatesStudio}
                    selfDestruct={reviewToggle}
                />
            )}
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
            <br />
            <br />
            <div>
                {studio?.reviews?.map((review, index) => (
                    <div key={index}>
                        <div>{review.title}</div>
                        <br />
                        <div>{review.body}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SingleStudio;
