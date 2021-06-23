import React, { useState } from "react";
import { Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import * as WORK_SERVICE from "../../services/work.service";
import * as CONSTS from "../../utils/consts";
import axios from "axios";

function LikeButton(props) {
    const { user, authenticate, workId, work } = props;

    console.log("props: ", props);
    const [icon, setIcon] = useState(false);
    const [like, setLike] = useState("Like");

    function handleClick(event) {
        event.preventDefault();
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        if (icon === false) {
            // add like to work.likes array
            axios
                .get(
                    `${CONSTS.SERVER_URL}/works/explore/${props.workId}/like`,
                    {
                        headers: {
                            authorization: accessToken,
                        },
                    }
                )
                .then((success) => {
                    console.log("success:", success);
                    if (success.data.likes.includes(success.data._id)) {
                        setIcon(false);
                    }
                    setIcon(!icon);
                    setLike(!like);
                })
                .catch((err) => {
                    console.error(err.response);
                });

            console.log("BUTTON CLICKED");
        } else {
            // remove like from work.likes array
            axios
                .get(
                    `${CONSTS.SERVER_URL}/works/explore/${props.workId}/unlike`,
                    {
                        headers: {
                            authorization: accessToken,
                        },
                    }
                )
                .then((success) => {
                    console.log("success:", success);
                    setIcon(!icon);
                    setLike(!like);
                })
                .catch((err) => {
                    console.error(err.response);
                });
        }

        //TODO change this into a patch request
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
