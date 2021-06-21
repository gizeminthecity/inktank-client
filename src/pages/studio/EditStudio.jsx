import React, { useState, useEffect } from "react";
import * as STUDIO_SERVICE from "../../services/studio.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Studio Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Studio Name"
                        value={form.name}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label>About:</label>
                    <input
                        type="text"
                        name="about"
                        placeholder="About Studio"
                        value={form.about}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label>Consultation Fee: </label>
                    <input
                        type="number"
                        name="consultation"
                        placeholder="Consultation Fee"
                        value={form.consultation}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label>Hourly Rate:</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Hourly Rate"
                        value={form.price}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter new addresse"
                        value={form.location}
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
