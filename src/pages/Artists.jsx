import React from "react";
import axios from "axios";

function Artists() {
    React.useEffect(() => {
        console.log("Some code here");
    });

    axios
        .get(`http://localhost:5005/api/artists`)
        .then((response) => {
            console.log("response: ", response);
        })
        .catch((err) => {
            console.error(err);
        });
    return (
        <div>
            <p>Artists Page</p>
        </div>
    );
}

export default Artists;
