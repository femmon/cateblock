import React from "react";

function FloatBox(props) {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(186, 186, 186, 0.5)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={props.handleClose}
        >
            <div onClick={event => event.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
}

export default FloatBox;
