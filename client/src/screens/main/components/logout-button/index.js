import React from "react";
import Button from "../../../../components/button";

function LogoutButton(props) {
    function handleClickLogout() {
        fetch("/accounts/session", {method: "DELETE"}).then(res => {
            if (res.status === 200) {
                props.handleClickStatus("logout");
            }
        }).catch(err => {throw err});
    }
    return (<Button className="logoutButton" content="Log Out" onClick={() => handleClickLogout()} />);
}

export default LogoutButton;
