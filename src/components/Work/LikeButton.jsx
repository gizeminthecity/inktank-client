import React, { useState } from "react";
import { Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import * as WORK_SERVICE from "../../services/work.service";
import * as CONSTS from "../../utils/consts";
import axios from "axios";

function LikeButton(props) {
    const { user, authenticate, workId, works, work } = props;
    const [like, setLike] = useState(false);
    const [getWork, setGetWork] = useState([]);
    const [icon, setIcon] = useState(false);
    const likeCount = work.likes.length;
    const [counter, setCounter] = useState(likeCount);
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    const workIdProps = props.match.params.workId;

    function checkLikes() {
        user.likes.includes(workId) ? setLike(true) : setIcon(false);
    }

    console.log("props: ", props);

    function likePost() {
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        axios
            .get(`${CONSTS.SERVER_URL}/works/explore/${props.workId}/like`, {
                headers: {
                    authorization: accessToken,
                },
            })
            .then((response) => {
                setLike(true);
                setCounter(counter + 1);
            })
            .catch((err) => {
                console.error(err.response);
            });
    }

    function unlikePost() {
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
        axios
            .get(`${CONSTS.SERVER_URL}/works/explore/${props.workId}/unlike`, {
                headers: {
                    authorization: accessToken,
                },
            })
            .then((response) => {
                setLike(false);
            })
            .catch((err) => {
                console.error(err.response);
            });
    }

    React.useEffect(() => {
        WORK_SERVICE.GET_WORK(props.workId, accessToken)
            .then((response) => {
                setGetWork(response.data);
                checkLikes();
                // console.log(response);
            })
            .catch((err) => {
                console.error(err);
            });
        return () => console.log("ARTISTS HERE");
    }, []);

    //     //TODO change this into a patch request

    return (
        <>
            {!like ? (
                <div>
                    <Button size="small" variant="outlined">
                        <FavoriteBorderIcon
                            onClick={() => {
                                likePost();
                            }}
                        />
                        <div style={{ paddingLeft: 5 }}>{counter}</div>
                    </Button>
                </div>
            ) : null}
            {like ? (
                <div>
                    <Button size="small" variant="outlined">
                        <FavoriteIcon
                            onClick={() => {
                                unlikePost();
                                setCounter(counter - 1);
                            }}
                        />
                        <div style={{ paddingLeft: 5 }}>{counter}</div>
                    </Button>
                </div>
            ) : null}
        </>
    );
}

export default LikeButton;
