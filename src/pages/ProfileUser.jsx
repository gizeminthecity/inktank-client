import React from "react";
import UpdatePassword from "../components/User/UpdatePassword";
import EditProfile from "../components/User/EditProfile";

function ProfileUser(props) {
    const { user, authenticate } = props;

    const [editProfile, setEditProfile] = React.useState(false);
    const [updatePassword, setUpdatePassword] = React.useState(false);
    // console.log("props:", props);

    function profileToggle() {
        setEditProfile(!editProfile);
    }

    function passwordToggle() {
        setUpdatePassword(!updatePassword);
    }

    return (
        <div>
            <h1> Hi, {user.username}</h1>
            <img
                src={user.photo}
                alt={`${user.username}`}
                style={{ width: "150px" }}
            />
            <div>
                <br />
                <button onClick={profileToggle}>Edit Profile</button>
                {editProfile && (
                    <EditProfile user={user} authenticate={authenticate} />
                )}
                <br />
                <br />
                <button onClick={passwordToggle}>Update Password</button>
                {updatePassword && <UpdatePassword />}
                <br />
                <br />
                <button>Delete Account</button>
            </div>
        </div>
    );
}

export default ProfileUser;
