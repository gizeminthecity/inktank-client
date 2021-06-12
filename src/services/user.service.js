import axios from "axios";
import * as CONSTS from "../utils/consts";

const userService = axios.create({
    baseURL: `${CONSTS.SERVER_URL}/user`,
});

export function EDIT_PROFILE(body, token) {
    return userService.put(`/edit`, body, {
        headers: {
            authorization: token,
        },
    });
}
