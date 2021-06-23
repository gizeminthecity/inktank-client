import React from "react";
import * as WORK_SERVICE from "../../services/work.service";
import * as CONSTS from "../../utils/consts";

function DeleteButton(props) {
    const { user, authenticate, workId, work } = props;

    function handleDelete(event) {
        event.preventDefault();

        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        WORK_SERVICE.DELETE(accessToken, props.workId)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    localStorage.removeItem("access_token");
                    // props.history.push(PATHS.HOMEPAGE);
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.error(err.response);
            });
    }
    return (
        <div>
            <div>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default DeleteButton;
