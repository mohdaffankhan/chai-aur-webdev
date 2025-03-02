import React from "react";
import UserContext from "../context/UserContext";
import { useContext } from "react";

function Profile() {
    const {user} = useContext(UserContext)
    return (
        <div>
            <h2>Profile</h2>
            {user ? <p>Username: {user.username}</p> : <p>Please login</p>}
        </div>
    )
}

export default Profile