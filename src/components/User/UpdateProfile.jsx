import React from "react";
import * as CONSTS from "../../utils/consts";
import * as USER_SERVICE from "../../services/user.service";
import * as PATHS from "../../utils/paths";
import { useHistory } from "react-router-dom";
import "./UpdateProfile.css";

function UpdateProfile(props) {
    const { user, authenticate, selfDestruct } = props;
    console.log("props: ", props);
    const [form, setForm] = React.useState({
        username: user.username,
        email: user.email,
    });

    const history = useHistory();

    console.log("form: ", form);
    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        USER_SERVICE.UPDATE_PROFILE(form, accessToken)
            .then((response) => {
                console.log("response: ", response);
                authenticate(response.data.user);
                history.push(`/user/${response.data.user.username}`);
                selfDestruct();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleDelete(event) {
        event.preventDefault();
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        USER_SERVICE.DELETE_USER(accessToken)
            .then((response) => {
                console.log(response);

                if (response.data.success) {
                    localStorage.removeItem("access_token");
                    props.history.push(PATHS.HOMEPAGE);
                }
                authenticate(null);
            })
            .catch((err) => {
                console.error(err.response);
            });
    }

    return (
        <div>
            <form className="edit_profile_form" onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input
                        className="edit_profile_input"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        style={{ marginRight: 37 }}
                    ></input>
                </div>
                <div>
                    <label> Email: </label>
                    <input
                        className="edit_profile_input"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    ></input>
                </div>
                <button className="edit_profile_button" type="submit">
                    Submit
                </button>
            </form>
            <div>
                <button className="edit_profile_button" onClick={handleDelete}>
                    Delete Account
                </button>
            </div>
        </div>
    );
}

export default UpdateProfile;
