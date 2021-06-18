import React, { useState } from "react";
import * as CONSTS from "../../utils/consts";
import * as USER_SERVICE from "../../services/user.service";
import * as PATHS from "../../utils/paths";

function AddWork(props) {
    const { history, authenticate } = props;

    const [post, setPost] = useState({
        photo: "",
        caption: "",
    });

    function handleSubmit(event) {
        event.preventDefault();
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        const formBody = new window.FormData();

        formBody.append("photo", post.photo);
        formBody.append("caption", post.caption);

        USER_SERVICE.ADD_WORK(
            formBody,
            accessToken,
            props.match.params.username
        )
            .then((response) => {
                console.log("response: ", response);
                authenticate(response.data.user);
                history.push(`/user/${response.data.user.username}`);
                // //  ;
            })
            .catch((err) => {
                console.error(err.response);
            });
    }

    function handleChange(event) {
        setPost({ ...post, [event.target.name]: event.target.value });
    }

    function handleImageChange(event) {
        setPost({ ...post, photo: event.target.files[0] });
    }

    return (
        <div>
            <h1>Add Works Here</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label>Upload Work</label>
                        <br />
                        <br />
                        <input type="file" onChange={handleImageChange} />
                    </div>

                    <br />
                    <div>
                        <label>Caption: </label>
                        <input
                            name="caption"
                            placeholder="Add a caption"
                            value={post.caption}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <br />
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddWork;
