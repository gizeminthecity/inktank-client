import React, { useState, useEffect } from "react";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";
import * as ARTIST_SERVICE from "../../services/artist.service";

function Artists() {
    const [artists, setArtists] = useState([]);
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    useEffect(() => {
        ARTIST_SERVICE.GET_ARTISTS(accessToken)
            .then((response) => {
                console.log(response);
                setArtists(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
        return () => console.log("ARTISTS HERE");
    }, [accessToken]);

    return (
        <div>
            {" "}
            <div>
                <h3>ARTISTS</h3>
                {artists.map((artist) => {
                    return (
                        <section key={artist._id}>
                            <img
                                src={artist.photo}
                                alt={`${artist.username}`}
                                style={{ width: "150px" }}
                            />
                            <br />
                            <Link
                                artist={artist}
                                to={`${PATHS.WORKS}/${artist.username}`}
                            >
                                {artist.username}'s Works
                            </Link>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}

export default Artists;
