import React, { useState, useEffect } from "react";
import * as CONSTS from "../../utils/consts";
import axios from "axios";
import EditStudio from "../Studio/EditStudio";
import AddReview from "../Review/AddReview";
// import * as PATHS from "../../utils/paths";
// import * as STUDIO_SERVICE from "../../services/studio.service";

function SingleStudio(props) {
    const { user, authenticate } = props;
    const [studio, setStudio] = useState({});

    useEffect(() => {
        axios
            .get(`${CONSTS.SERVER_URL}/studios/${props.match.params.studioId}`)
            .then((response) => {
                console.log("response:", response);
                setStudio(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [props.match.params.studioId]);

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

    const [editStudio, setEditStudio] = useState(false);
    // const [updatePicture, setUpdatePicture] = useState(false);

    const [addReview, setAddReview] = useState(false);

    function reviewToogle() {
        setAddReview(!addReview);
    }

    function editToggle() {
        setEditStudio(!editStudio);
    }

    // function photoToggle() {
    //     setUpdatePicture(!updatePicture);
    // }
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
            <br />

            {owner !== user._id ? (
                <button onClick={reviewToogle}>Add review</button>
            ) : null}

            <br />
            {addReview && (
                <AddReview
                    studio={studio}
                    setStudio={setStudio}
                    user={user}
                    authenticate={authenticate}
                />
            )}

            <br />
            {owner === user._id ? (
                <button onClick={editToggle}>Edit Studio</button>
            ) : null}
            <br />
            {editStudio && (
                <EditStudio
                    studio={studio}
                    setStudio={setStudio}
                    user={user}
                    authenticate={authenticate}
                />
            )}
        </div>
    );
}

export default SingleStudio;
