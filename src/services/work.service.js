import axios from "axios";
import * as CONSTS from "../utils/consts";

const workService = axios.create({
    baseURL: `${CONSTS.SERVER_URL}`,
});

export function GET_WORKS(token) {
    return workService.get(`/works`, {
        headers: {
            authorization: token,
        },
    });
}

export function ADD_WORK(body, token) {
    return workService.post(`/works/add`, body, {
        headers: {
            authorization: token,
        },
    });
}
export function LIKE(token, workId) {
    return workService.put(`/works/${workId}`, {
        headers: {
            authorization: token,
        },
    });
}

export function UNLIKE(token, workId) {
    return workService.put(`/work/${workId}`, {
        headers: {
            authorization: token,
        },
    });
}
