export const HOMEPAGE = "/";
export const SIGNUPPAGE = "/auth/signup";
export const LOGINPAGE = "/auth/login";
export const PROTECTEDPAGE = "/protected";

export const USER = "/user";
export const PROFILE = `${USER}/:username`;

export const STUDIOS = `/studios`;
export const ADD_STUDIO = `${STUDIOS}/add`;
export const SINGLE_STUDIO = `${STUDIOS}/:studioId`;
export const EDIT_STUDIO = `${STUDIOS}/:studioId/edit`;
export const DELETE_STUDIO = `${STUDIOS}/:studioId/delete`;

export const WORKS = "/works";
export const ARTIST_WORKS = `${WORKS}/:username`;
export const ADD_WORK = `${WORKS}/add`;
export const SINGLE_WORK = `${WORKS}/:workId`;

export const ARTISTS = "/artists";
export const EXPLORE = "/explore";
