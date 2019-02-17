import React from "react";

class Stack extends React.Component {
    render() {
        return (
            <div>
                {this.props.posts.map(({EntryID, Content, PostTime}) => {
                    return (
                        <div key={EntryID}>
                            <div>
                                <span>{new Date(PostTime).toLocaleString()}</span>
                                <span>Hamburger 
                                    <span onClick={() => this.props.handleClickEditorEdit(EntryID)}>Editor </span>
                                    <span onClick={() => this.props.postDelete(EntryID)}>Delete</span>
                                </span>
                            </div>
                            <p>{Content}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Stack;
