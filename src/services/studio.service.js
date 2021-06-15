import axios from "axios";
import * as CONSTS from "../utils/consts";
// import * as PATHS from "../utils/paths";

const studioService = axios.create({
    baseURL: `${CONSTS.SERVER_URL}/studios`,
});

// export function GET_STUDIO(studioId) {
//     return studioService.get(`/${studioId}`, {
//         headers: {
//             authorization: token,
//         },
//     });
// }

export function ADD_STUDIO(body, token) {
    return studioService.post(`/add`, body, {
        headers: {
            authorization: token,
        },
    });
}

export function EDIT_STUDIO(body, token, studio) {
    return studioService.put(`/${studio._id}/edit`, body, {
        headers: {
            authorization: token,
        },
    });
}
export function UPDATE_PHOTO(body, token) {
    return studioService.post(`/update-photo`, body, {
        headers: {
            authorization: token,
        },
    });
}

export function DELETE_STUDIO(token) {
    return studioService.delete(`/delete`, {
        headers: {
            authorization: token,
        },
    });
}
