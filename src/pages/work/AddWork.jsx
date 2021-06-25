import React, { useState } from "react";
import * as CONSTS from "../../utils/consts";
import * as WORK_SERVICE from "../../services/work.service";
import * as PATHS from "../../utils/paths";
import "./AddWork.css";

function AddWork(props) {
    const { history } = props;

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

        WORK_SERVICE.ADD_WORK(formBody, accessToken)
            .then((response) => {
                console.log("response: ", response);
                history.push(`${PATHS.USER}/${props.user.username}`);
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
        <div className="add_work_container">
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input
                            className="add_work_input extra"
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div>
                        <input
                            className="add_work_input"
                            name="caption"
                            placeholder="Add a caption"
                            value={post.caption}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div>
                        <button className="add_work_button" type="submit">
                            Upload
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddWork;
