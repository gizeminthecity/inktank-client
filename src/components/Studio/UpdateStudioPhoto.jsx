import React from "react";
import * as STUDIO_SERVICE from "../../services/studio.service";
import * as CONSTS from "../../utils/consts";
import "./UpdateStudioPhoto.css";

function UpdateStudioPhoto(props) {
    const { studio, updatesStudio, selfDestruct } = props;

    const [studioPhoto, setStudioPhoto] = React.useState({
        photo: studio.photo,
    });

    function handleChange(event) {
        const image = event.target.files[0];
        setStudioPhoto(image);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        if (!studioPhoto) {
            console.log("Please pick an image!");
            return;
        }

        const formBody = new window.FormData();
        formBody.append("photo", studioPhoto);

        STUDIO_SERVICE.UPDATE_PHOTO(formBody, accessToken, studio)
            .then((res) => {
                console.log("response: ", res);
                updatesStudio({ ...studio, photo: res.data.photoFromServer });
                selfDestruct();
            })
            .catch((err) => {
                console.error(err.response);
            });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className="studio_update_photo_input"
                    type="file"
                    onChange={handleChange}
                />
                <button className="studio_update_photo_button" type="submit">
                    Upload
                </button>
            </form>
        </div>
    );
}

export default UpdateStudioPhoto;
