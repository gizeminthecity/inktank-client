import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";

function Artists() {
    const [artistList, setArtistList] = React.useState([]);

    React.useEffect(() => {
        // console.log("Some code here");

        axios
            .get(`http://localhost:5005/api/artists`)
            .then((response) => {
                // console.log("response: ", response);
                setArtistList(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
        return () => console.log("DONE");
    }, []);

    return (
        <div>
            <p>Artists Page</p>
            {artistList.map((artist) => {
                return (
                    <section key={artist._id}>
                        <Link to={`${PATHS.ARTISTS}/${artist._id}`}>
                            <h2>{artist.name}</h2>
                            <img
                                src={artist.photo}
                                style={{ width: "100px" }}
                                alt="artist"
                            />
                        </Link>
                    </section>
                );
            })}
        </div>
    );
}

export default Artists;
