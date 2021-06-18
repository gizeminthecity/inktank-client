import axios from "axios";
import * as CONSTS from "../utils/consts";

const userService = axios.create({
    baseURL: `${CONSTS.SERVER_URL}/user`,
});

export function GET_USER(username, token) {
    return userService.get(`/${username}`, {
        headers: {
            authorization: token,
        },
    });
}

export function UPDATE_PROFILE(body, token, username) {
    return userService.put(`/${username}/update`, body, {
        headers: {
            authorization: token,
        },
    });
}

export function UPDATE_PHOTO(body, token) {
    return userService.post(`/update-photo`, body, {
        headers: {
            authorization: token,
        },
    });
}

export function DELETE_USER(token) {
    return userService.delete(`/delete`, {
        headers: {
            authorization: token,
        },
    });
}

export function ADD_WORK(body, token, username) {
    return userService.post(`/${username}/add-work`, body, {
        headers: {
            authorization: token,
        },
    });
}
