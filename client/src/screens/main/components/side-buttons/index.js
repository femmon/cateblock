import React from "react";
import {EditorConnect} from "../editor-context";

function SideButtons(props) {
    return (
        <div>
            <button onClick={props.handleClickEditorAdd}>Add</button>
            <button onClick={() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                });
            }}>Up</button>
        </div>
    );
}

export default EditorConnect(SideButtons);
