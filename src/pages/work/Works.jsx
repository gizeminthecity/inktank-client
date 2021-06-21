import React from "react";
import LikeButton from "../../components/Work/LikeButton";

import * as WORK_SERVICE from "../../services/work.service";
import * as CONSTS from "../../utils/consts";

function Works(props) {
    const { user } = props;
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
            <div className="works">
                {works?.map((work) => (
                    <div key={work._id}>
                        <div>
                            <img
                                src={work.photo}
                                alt="work"
                                style={{ width: "150px" }}
                            />
                            <div>
                                <p>{work.caption}</p>
                            </div>
                            <br />
                            <LikeButton work={work} key={work._id} />
                            <br />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Works;
