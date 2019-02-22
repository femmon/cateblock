import React from "react";

class Stack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: null,
            posts: []
        }
    }
    viewEdit(id) {
        fetch("/view-edit", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({entryID: id})
        }).then(res => res.json()).then(posts => {
            this.setState({
                history: id,
                posts
            });
        }).catch(err => {throw err;});
    }
    closeViewEdit() {
        this.setState({
            history: null,
            posts: []
        })
    }
    render() {
        return (
            <div>
                {this.props.posts.map(({EntryID, Content, PostTime, Edited}) => {
                    return (
                        <div key={EntryID} style={{border: "5px solid black"}}>
                            <div>
                                <p>{new Date(PostTime).toLocaleString()}</p>
                                {Edited !== 0 && <p>Edited</p>}
                                <p>Hamburger
                                    <span onClick={() => this.props.handleClickEditorEdit(EntryID)}>Editor </span>
                                    {Edited && <span onClick={() => this.viewEdit(EntryID)}>View edit </span>}
                                    <span onClick={() => this.props.postDelete(EntryID)}>Delete</span>
                                </p>
                            </div>
                            <p>{Content}</p>
                            {this.state.history === EntryID && (
                                <div style={{border: "5px solid black"}}>
                                    <span onClick={() => this.closeViewEdit()}>Close</span>
                                    {this.state.posts.map(({Content, PostTime}, index) => {
                                        return (
                                            <div key={index} style={{border: "5px solid black"}}>
                                                <p>{new Date(PostTime).toLocaleString()}</p>
                                                <p>{Content}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Stack;
