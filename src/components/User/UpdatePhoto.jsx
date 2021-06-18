import React from "react";
import * as USER_SERVICE from "../../services/user.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

function UpdatePhoto(props) {
    const { user, authenticate } = props;

    // console.log("props: ", props);
    const [profilePhoto, setProfilePhoto] = React.useState({
        photo: user.photo,
    });

    function handleChange(event) {
        // console.log("event.target: ", event.target);
        const image = event.target.files[0];
        setProfilePhoto(image);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        if (!profilePhoto) {
            console.log("Please pick an image!");
            return;
        }

        const formBody = new window.FormData();
        formBody.append("photo", profilePhoto);

        USER_SERVICE.UPDATE_PHOTO(formBody, accessToken)
            .then((res) => {
                console.log("response: ", res);
                setProfilePhoto({ ...user, photo: res.data.photoFromServer });
                // props.history.push(`${PATHS.USER}/`)
            })
            .catch((err) => {
                console.error(err.response);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default UpdatePhoto;
