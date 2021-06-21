import axios from "axios";
import * as CONSTS from "../utils/consts";

const artistService = axios.create({
    baseURL: `${CONSTS.SERVER_URL}`,
});

export function GET_ARTISTS(token) {
    return artistService.get(`/artists`, {
        headers: {
            authorization: token,
        },
    });
}

export function GET_ARTIST(token, artist) {
    return artistService.get(`/artists/${artist.username}`, {
        headers: {
            authorization: token,
        },
    });
}
