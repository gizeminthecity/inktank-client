import React from "react";
import * as WORK_SERVICE from "../../services/work.service";
import * as CONSTS from "../../utils/consts";
import * as DeleteButton from "../../components/Work/DeleteButton";
import "./MyWorks.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Button } from "@material-ui/core";

function MyWorks(props) {
    const { user } = props;
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        WORK_SERVICE.GET_WORKS(accessToken, props.match.params.username)
            .then((response) => {
                console.log("response:", response);
                setPosts(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [props.match.params.username]);

    function handleDelete(event, workId) {
        event.preventDefault();

        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
        WORK_SERVICE.DELETE(accessToken, workId)
            .then((response) => {
                console.log("RESPONSE:", response);
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div>
            <p>My Works</p>
            <div className="explore_works">
                {posts.works?.map((work) => {
                    return (
                        <>
                            <section className="work_section " key={work._id}>
                                <div>
                                    <img
                                        className="myWork_photo"
                                        src={work.photo}
                                        alt="Artists img"
                                    />
                                </div>
                                <div className="additional">
                                    <div>{work.caption}</div>
                                    <div>
                                        <Button size="small" variant="outlined">
                                            <FavoriteIcon />
                                            {work.likes.length}
                                        </Button>
                                    </div>
                                </div>{" "}
                                <div className="myWork_delete_button">
                                    {work.owner !== user._id ? (
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={(e) =>
                                                handleDelete(e, work._id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    ) : null}
                                </div>
                            </section>
                        </>
                    );
                })}
            </div>
        </div>
    );
}

export default MyWorks;
