// import React, { useState, useEffect } from "react";
// import * as ARTIST_SERVICE from "../../services/artist.service";
// import * as CONSTS from "../../utils/consts";
// import * as PATHS from "../../utils/paths";

// function SingleArtist(props) {
//     const [artist, setArtist] = useState({});

//     useEffect(() => {
//         const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

//         ARTIST_SERVICE.GET_ARTIST(props.match.params.username, accessToken)
//             .then((response) => {
//                 console.log(response.data);
//                 setArtist(response.data);
//             })
//             .catch((err) => {
//                 console.error(err.response);
//             });
//     }, [props.match.params.username]);

//     return (
//         <div>
//             {!artist}
//             <p>Artist Name: {artist.username} </p>
//         </div>
//     );
// }

// export default SingleArtist;
