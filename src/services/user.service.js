import axios from "axios";
import * as CONSTS from "../utils/consts";

const userService = axios.create({
    baseURL: `${CONSTS.SERVER_URL}/user`,
});

export function UPDATE_PROFILE(body, token) {
    return userService.put(`/update`, body, {
        headers: {
            authorization: token,
        },
    });
}

export function UPDATE_PHOTO(body, token) {
    return userService
        .post(`/update-photo`, body, {
            headers: {
                authorization: token,
            },
        })
        .then((response) => {
            console.log("Photo from server: ", response.data);
            return response.data;
        });
}
