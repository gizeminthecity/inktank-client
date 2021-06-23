import axios from "axios";
import * as CONSTS from "../utils/consts";

const workService = axios.create({
    baseURL: `${CONSTS.SERVER_URL}/works`,
});

export function GET_WORKS(token, username) {
    return workService.get(`/${username}`, {
        headers: {
            authorization: token,
        },
    });
}

export function ADD_WORK(body, token) {
    return workService.post(`/add`, body, {
        headers: {
            authorization: token,
        },
    });
}
export function LIKE(token, workId) {
    return workService.put(`/${workId}/like`, {
        headers: {
            authorization: token,
        },
    });
}

export function UNLIKE(token, workId) {
    return workService.put(`/${workId}`, {
        headers: {
            authorization: token,
        },
    });
}

export function EXPLORE(token) {
    return workService.get("explore", {
        headers: {
            authorization: token,
        },
    });
}

export function DELETE(token, workId) {
    return workService.get(`/${workId}/delete`, {
        headers: {
            authorization: token,
        },
    });
}
