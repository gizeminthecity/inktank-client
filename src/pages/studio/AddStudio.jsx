import React from "react";
import * as CONSTS from "../../utils/consts";
import * as STUDIO_SERVICE from "../../services/studio.service";
import * as PATHS from "../../utils/paths";

function AddStudio(props) {
    const [form, setForm] = React.useState({
        name: "",
        city: "",
        country: "",
        about: "",
        location: "",
        consultation: "",
        price: "",
    });

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    function handleSubmit(event) {
        event.preventDefault();

        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        STUDIO_SERVICE.ADD_STUDIO(form, accessToken)
            .then((response) => {
                if (!response) {
                    return console.log("FAILED");
                }
                console.log("response:", response);
                props.history.push(
                    `${PATHS.STUDIOS}/${response.data.studio._id}`
                );
            })
            .catch((err) => {
                console.error("err:", err.response);
            });
    }

    return (
        <div>
            <br />
            <br />
            <h3>Add Studio</h3>
            <br />
            <br />

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={form.username}
                    />
                </div>
                <div>
                    <label>Contact: </label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={form.email}
                    />
                </div>
                <div>
                    <label>Studio Name: </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Studio Name"
                        onChange={handleChange}
                        value={form.name}
                    />
                </div>
                <br />

                <div>
                    <label>About: </label>
                    <input
                        type="text"
                        name="about"
                        placeholder="About"
                        onChange={handleChange}
                        value={form.about}
                    />
                </div>
                <br />
                <div>
                    <label>City: </label>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                        value={form.city}
                    />
                </div>
                <br />
                <div>
                    <label>Country: </label>
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        onChange={handleChange}
                        value={form.country}
                    />
                </div>
                <br />
                <br />
                <div>
                    <label>Location: </label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter Studio Addresse"
                        onChange={handleChange}
                        value={form.location}
                    />
                </div>
                <br />
                <div>
                    <label>Consultation Fee: </label>
                    <input
                        type="number"
                        name="consultation"
                        placeholder="Consultation Fee"
                        onChange={handleChange}
                        value={form.consultation}
                    />
                </div>
                <br />
                <div>
                    <label>Hourly rate: </label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                        value={form.price}
                    />
                </div>
                <br />
                <button type="submit">Add Studio</button>
            </form>
        </div>
    );
}

export default AddStudio;
