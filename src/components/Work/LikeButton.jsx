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
                    // if (success.data.likes.includes(success.data._id)) {
                    //     setIcon(false);
                    // }
                    setIcon(!icon);
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
                })
                .catch((err) => {
                    console.error(err.response);
                });
        }

        //TODO change this into a patch request
    }

    return (
        <div>
            <Button size="small" onClick={handleClick} variant="outlined">
                {icon ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                <div style={{ paddingLeft: 5 }}>{work.likes.length}</div>
            </Button>
        </div>
    );
}

export default LikeButton;
