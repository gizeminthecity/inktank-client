import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfileArtist(props) {
    // console.log("props: ", props);
    const [artist, setArtist] = useState({});

    useEffect(() => {
        axios
            .get(
                `http://localhost:5005/api/artists/${props.match.params.artistId}`
            )
            .then((response) => {
                // console.log("response: ", response);
                setArtist(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h2>{artist.name}</h2>
            <p>
                Location: {artist.city}, {artist.country}
            </p>
            <h2>About: {artist.about}</h2>
            <img src={artist.picture} style={{ width: "150px" }} />
            <h2> Price: {artist.price}</h2>
            <h2>Consultation Fee: {artist.consultation}</h2>
        </div>
    );
}

export default ProfileArtist;
