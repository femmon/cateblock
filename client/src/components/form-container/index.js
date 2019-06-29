import React from "react";
import Form from "./form";

function FormContainer(props) {
    function handleClick(path) {
        return (username, password) => {
            fetch(`/accounts/${path}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            }).then(res => {
                if (res.status === 200) {
                    props.handleStateLogin();
                }
            }).catch(err => {throw err});
        }
    }
    return (
        <Form
            handleClickSignup={(username, password) => handleClick("")(username, password)}
            handleClickLogin={(username, password) => handleClick("session")(username, password)}
        />);
}

export default FormContainer;
