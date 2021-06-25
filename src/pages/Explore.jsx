import React from "react";
import * as CONSTS from "../utils/consts";
import LikeButton from "../components/Work/LikeButton";
import * as WORK_SERVICE from "../services/work.service";
import "./Explore.css";

// import axios from "axios";
// import * as PATHS from "../utils/paths";

function Explore(props) {
    const [works, setWorks] = React.useState([]);
    // const [studios, setStudios] = React.useState([]);
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
    }, [accessToken]);

    // React.useEffect(() => {
    //     axios
    //         .get(`${CONSTS.SERVER_URL}/${PATHS.STUDIOS}`)
    //         .then((response) => {
    //             // console.log(response);
    //             setStudios(response.data);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    //     return () => console.log("STUDIOS HERE");
    // }, []);

    return (
        <div>
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
                                <p></p>
                            </div>

                            <div className="explore_work_bottom">
                                <div>
                                    <p className="explore_owner">
                                        <b>{work.owner.username} </b>
                                        <span className="explore_span">
                                            {work.caption}
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <LikeButton
                                        {...props}
                                        work={work}
                                        workId={work._id}
                                        key={work.index}
                                        works={works}
                                        setWorks={setWorks}
                                    />
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}

export default Explore;
