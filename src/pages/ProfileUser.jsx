import React from "react";
import UpdatePassword from "../components/User/UpdatePassword";
import UpdateProfile from "../components/User/UpdateProfile";
import UpdatePhoto from "../components/User/UpdatePhoto";

function ProfileUser(props) {
    const { user, authenticate } = props;

    const [updateProfile, setUpdateProfile] = React.useState(false);
    const [updatePassword, setUpdatePassword] = React.useState(false);
    const [updatePicture, setUpdatePicture] = React.useState(false);
    // console.log("props:", props);

    function profileToggle() {
        setUpdateProfile(!updateProfile);
    }

    function passwordToggle() {
        setUpdatePassword(!updatePassword);
    }

    function photoToggle() {
        setUpdatePicture(!updatePicture);
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
                {updateProfile && (
                    <UpdateProfile user={user} authenticate={authenticate} />
                )}
                <br />
                <br />

                <button onClick={photoToggle}>Update Profile Photo</button>
                {updatePicture && (
                    <UpdatePhoto user={user} authenticate={authenticate} />
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
