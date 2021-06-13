import React from "react";
import * as CONSTS from "../../utils/consts";
import * as USER_SERVICE from "../../services/user.service";

function UpdateProfile(props) {
    const { user, authenticate } = props;
    // console.log("props: ", props);
    const [form, setForm] = React.useState({
        username: user.username,
        email: user.email,
    });

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
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username: </label>
                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                ></input>
            </div>
            <div>
                <label>Email: </label>
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                ></input>
            </div>
            <button>Submit</button>
        </form>
    );
}

export default UpdateProfile;
