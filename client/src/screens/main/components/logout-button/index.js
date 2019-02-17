import React from "react";
import Button from "../../../../components/button";

function LogoutButton(props) {
    function handleClickLogout() {
        fetch("/signout", {method: "POST"}).then(res => {
            if (res.status == 200) {
                props.handleClickStatus("logout");
            }
        }).catch(err => {throw err});
    }
    return (<Button style="logoutButton" content="Log Out" onClick={() => handleClickLogout()} />);
}

export default LogoutButton;
