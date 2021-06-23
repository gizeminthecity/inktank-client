import React from "react";
import LikeButton from "../../components/Work/LikeButton";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";

import * as WORK_SERVICE from "../../services/work.service";
import * as CONSTS from "../../utils/consts";

function Works(props) {
    const { user, artist } = props;
    const [works, setWorks] = React.useState([]);

    React.useEffect(() => {
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        WORK_SERVICE.GET_WORKS(accessToken, props.match.params.username)
            .then((response) => {
                console.log(response);
                setWorks(response.data);
            })
            .catch((err) => {
                console.error((err) => {
                    console.error(err.response);
                });
            });
        return () => console.log("STUDIOS HERE");
    }, [props.match.params.username]);

    return (
        <div>
            <p>My Works</p>

            {props.works?.map((work) => {
                return (
                    <>
                        <section key={work._id}>
                            <Link to={`${PATHS.WORKS}/${work._id}`}>
                                <img
                                    src={work.photo}
                                    alt="Artists img"
                                    style={{ width: "150px" }}
                                />
                                <br />
                            </Link>
                            <div> {work.caption}</div>{" "}
                            <LikeButton
                                {...props}
                                work={work}
                                workId={work._id}
                            />
                        </section>
                    </>
                );
            })}
        </div>
        // <div>
        //     <div className="works">
        //         {user.works?.map((work) => (
        //             <div key={work._id}>
        //                 <div>
        //                     <img
        //                         src={work.photo}
        //                         alt="work"
        //                         style={{ width: "150px" }}
        //                     />
        //                     <div>
        //                         <p>{work.caption}</p>
        //                     </div>
        //                     <br />
        //                     <LikeButton work={work} key={work._id} />
        //                     <br />
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
}

export default Works;
