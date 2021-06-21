import React, { useState } from "react";
import { Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import * as WORK_SERVICE from "../../services/work.service";
import * as CONSTS from "../../utils/consts";

function LikeButton(props) {
    const { user, authenticate, work } = props;

    console.log("work", work._id);

    // console.log("props: ", props);
    const [icon, setIcon] = useState(false);
    const [like, setLike] = useState("Like");

    function handleClick(event) {
        event.preventDefault();
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        // console.log(props);

        if (icon === false) {
            // add like to work.likes array
            WORK_SERVICE.LIKE(work._id, accessToken)
                .then((response) => {
                    console.log("response: ", response.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        } else {
            // remove like from work.likes array
        }

        console.log("BUTTON CLICKED");
        setIcon(!icon);
        setLike(!like);
    }

    return (
        <div>
            <div style={{ border: "1px, solid, black" }}>
                {user?.works?.likes?.length}
            </div>
            <Button size="small" onClick={handleClick} variant="outlined">
                {icon ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                {like ? "Like" : "Liked"}
            </Button>
        </div>
    );
}

export default LikeButton;
