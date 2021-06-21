import React from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";

function Studios() {
    const [studios, setStudios] = React.useState([]);

    React.useEffect(() => {
        axios
            .get(`${CONSTS.SERVER_URL}/${PATHS.STUDIOS}`)
            .then((response) => {
                console.log(response);
                setStudios(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
        return () => console.log("STUDIOS HERE");
    }, []);

    return (
        <div>
            <h3>Studios</h3>
            {studios.map((studio) => {
                return (
                    <section key={studio._id}>
                        <Link to={`${PATHS.STUDIOS}/${studio._id}`}>
                            <h4>
                                {studio.name} by {studio.owner.username}
                            </h4>
                        </Link>
                    </section>
                );
            })}
        </div>
    );
}

export default Studios;
