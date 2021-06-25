import React from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";
import "./Studios.css";

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
            <h3 className="studios_headline">Studios</h3>
            <div className="studios_container">
                {studios.map((studio) => {
                    return (
                        <section className="studio_section" key={studio._id}>
                            <Link
                                className="studio_link"
                                to={`${PATHS.STUDIOS}/${studio._id}`}
                            >
                                <div>
                                    <img
                                        src={studio.photo}
                                        className="studio_image"
                                        alt="studio foto"
                                    />
                                    <h4>
                                        {studio.name}
                                        {/* by {studio.owner.username} */}
                                    </h4>
                                </div>
                                <div className="studio_see_details">
                                    <p>See details</p>
                                </div>
                            </Link>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}

export default Studios;
