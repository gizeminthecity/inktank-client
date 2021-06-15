import React, { useState } from "react";
import * as STUDIO_SERVICE from "../../services/studio.service";
import * as CONSTS from "../../utils/consts";

function EditStudio(props) {
    const { studio, setStudio } = props;

    const { name, about, consultation, price, location } = studio;

    const [form, setForm] = useState({
        name: name,
        about: about,
        consultation: consultation,
        price: price,
        location: location,
    });

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    function handleSubmit(event) {
        event.preventDefault();

        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        STUDIO_SERVICE.EDIT_STUDIO(form, accessToken, studio)
            .then((response) => {
                console.log("response edit studio: ", response);
                setStudio(response.data.studio);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Studio Name:</label>
                    <input
                        name="name"
                        placeholder="Studio Name"
                        value={form.name}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label>About:</label>
                    <input
                        name="about"
                        placeholder="About Studio"
                        value={form.about}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label>Consultation Fee: </label>
                    <input
                        name="consultation"
                        placeholder="Consultation Fee"
                        value={form.consultation}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label>Hourly Rate:</label>
                    <input
                        name="price"
                        placeholder="Hourly Rate"
                        value={form.price}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label>Location:</label>
                    <input
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
