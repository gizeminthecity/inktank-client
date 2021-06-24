import React from "react";
import axios from "axios";
import useForm from "../../hooks/useForm";
import * as CONSTS from "../../utils/consts";
import "./AddReview.css";
function AddReview(props) {
    const [form, handleChange, handleSubmit] = useForm({ title: "", body: "" });
    const onSubmit = handleSubmit((formValues) => {
        console.log(formValues);
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

        axios
            .post(
                `${CONSTS.SERVER_URL}/studios/${props.studioId}/add-review`,
                formValues,
                {
                    headers: {
                        authorization: accessToken,
                    },
                }
            )
            .then((success) => {
                console.log("success:", success);
                props.updatesStudio(success.data.studio);
                props.selfDestruct();
            })
            .catch((err) => {
                console.error(err.response);
            });
    });

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <div style={{ padding: 10 }}>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Review title"
                    />
                </div>
                <div>
                    <label></label>
                    <textarea
                        type="text"
                        name="body"
                        value={form.body}
                        onChange={handleChange}
                        placeholder="..."
                    />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default AddReview;
