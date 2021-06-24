import React from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";
import LikeButton from "../components/Work/LikeButton";
import * as WORK_SERVICE from "../services/work.service";
import * as STUDIO_SERVICE from "../services/studio.service";
import "./Explore.css";
function Explore(props) {
    const [works, setWorks] = React.useState([]);
    const [studios, setStudios] = React.useState([]);
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    React.useEffect(() => {
        WORK_SERVICE.EXPLORE(accessToken)
            .then((response) => {
                // console.log(response);
                setWorks(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
        return () => console.log("ARTISTS HERE");
    }, []);

    React.useEffect(() => {
        axios
            .get(`${CONSTS.SERVER_URL}/${PATHS.STUDIOS}`)
            .then((response) => {
                // console.log(response);
                setStudios(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
        return () => console.log("STUDIOS HERE");
    }, []);

    return (
        <div>
            <h3 className="headline_explore"></h3>
            <div className="explore_works">
                {works.map((work, index) => {
                    return (
                        <section className="work_section" key={work._id}>
                            <div>
                                <img
                                    src={work.photo}
                                    alt="Artists img"
                                    style={{ width: "300px" }}
                                />
                            </div>

                            <div className="explore_work_bottom">
                                <div>
                                    <p className="explore_owner">
                                        by {work.owner.username}
                                    </p>
                                </div>
                                <div>
                                    <LikeButton
                                        {...props}
                                        work={work}
                                        workId={work._id}
                                        key={work.index}
                                    />
                                </div>
                            </div>

                            {/* <Link to={`${PATHS.WORKS}/${work.owner.username}`}> */}
                            {/* </Link> */}
                        </section>
                    );
                })}
            </div>
        </div>
    );
}

export default Explore;
