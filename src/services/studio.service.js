import axios from "axios";
import * as CONSTS from "../utils/consts";
// import * as PATHS from "../utils/paths";

const studioService = axios.create({
    baseURL: `${CONSTS.SERVER_URL}/studios`,
});

export function GET_STUDIO(studioId, token) {
    return studioService.get(`/${studioId}`, {
        headers: {
            authorization: token,
        },
    });
}

export function ADD_STUDIO(body, token) {
    return studioService.post(`/add`, body, {
        headers: {
            authorization: token,
        },
    });
}

export function GET_EDIT_STUDIO(studioId, token) {
    return studioService.get(`/${studioId}/edit`, {
        headers: {
            authorization: token,
        },
    });
}

export function EDIT_STUDIO(body, studioId, token) {
    return studioService.put(`/${studioId}/edit`, body, {
        headers: {
            authorization: token,
        },
    });
}

export function UPDATE_PHOTO(body, token, studio) {
    return studioService.post(`/${studio._id}/update-photo`, body, {
        headers: {
            authorization: token,
        },
    });
}

export function DELETE(token, studioId) {
    return studioService.get(`/${studioId}/delete`, {
        headers: {
            authorization: token,
        },
    });
}
