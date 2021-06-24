import React, { useState, useEffect } from "react";
import * as STUDIO_SERVICE from "../../services/studio.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import "./EditStudio.css";

function EditStudio(props) {
    const { user, authenticate } = props;

    const [studio, setStudio] = useState({});

    useEffect(() => {
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        STUDIO_SERVICE.GET_EDIT_STUDIO(props.match.params.studioId, accessToken)
            .then((response) => {
                console.log("response:", response);
                setStudio(response.data);
            })
            .catch((err) => {
                console.error(err.response);
            });
    }, [props.match.params.studioId]);
    const [form, setForm] = useState({
        name: "",
        about: "",
        consultation: "",
        price: "",
        location: "",
    });

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        STUDIO_SERVICE.EDIT_STUDIO(
            form,
            props.match.params.studioId,
            accessToken
        )
            .then((response) => {
                console.log("response edit studio: ", response);
                setStudio(response.data);
                props.history.push(`${PATHS.STUDIOS}/${studio._id}`);
            })
            .catch((err) => {
                console.error(err.response);
            });
    }

    return (
        <div>
            <h2 className="headline_edit_studio">Edit Studio</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="belong"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        name="email"
                        placeholder="Studio email"
                        value={form.email}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Studio Name"
                        value={form.name}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        name="about"
                        placeholder="About Studio"
                        value={form.about}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter new addresse"
                        value={form.location}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <input
                        type="number"
                        name="consultation"
                        placeholder="Consultation Fee"
                        value={form.consultation}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <input
                        type="number"
                        name="price"
                        placeholder="Hourly Rate"
                        value={form.price}
                        onChange={handleChange}
                    ></input>
                </div>
                <button type="submit">Update</button>
            </form>
            <br />
            <br />
        </div>
    );
}

export default EditStudio;
