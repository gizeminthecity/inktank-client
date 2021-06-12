import React from "react";

function UpdatePassword() {
    return (
        <form>
            <div>
                <label>Password: </label>
                <input name="password" placeholder="Password"></input>
            </div>
            <div>
                <label>New Password: </label>
                <input name="password" placeholder="New Password"></input>
            </div>
            <div>
                <label>Confirm New Password: </label>
                <input
                    name="password"
                    placeholder="Confirm New Password"
                ></input>
            </div>
            <button>Update Password</button>
        </form>
    );
}

export default UpdatePassword;
