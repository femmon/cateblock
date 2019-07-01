import React from "react";
import Hamburger from "./components/hamburger";

class Stack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: null,
            posts: []
        }
        this.closeViewEdit = this.closeViewEdit.bind(this);
    }
    viewEdit(id) {
        fetch(`/entries/history/${id}`).then(res => res.json()).then(posts => {
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
        return (<section>
            {this.props.posts.map(({EntryID, Content, PostTime, Edited}) => {
                return (<article key={EntryID} style={{border: "5px solid black"}}>
                    <div>
                        <p>{toLocalePostTime(PostTime)}</p>

                        {Edited !== 0 && <p>Edited</p>}

                        <Hamburger
                            isOpeningHistory={this.state.history === EntryID}
                            closeViewEdit={this.closeViewEdit}
                            handleClickEditorEdit={() => {
                                this.props.handleClickEditorEdit(EntryID);
                            }}
                            Edited={Edited}
                            viewEdit={() => this.viewEdit(EntryID)}
                            postDelete={() => this.props.postDelete(EntryID)}
                        />
                    </div>

                    <p>{Content}</p>

                    {this.state.history === EntryID && (
                        <div style={{border: "5px solid black"}}>
                            <span onClick={() => this.closeViewEdit()}>Close</span>

                            {this.state.posts.map(({Content, PostTime}, index) => {
                                return (
                                    <div key={index} style={{border: "5px solid black"}}>
                                        <p>{toLocalePostTime(PostTime)}</p>

                                        <p>{Content}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </article>);
            })}
        </section>);
    }
}

function toLocalePostTime(PostTime) {
    return new Date(PostTime).toLocaleString().replace(/:\d{2} /, " ");
}

export default Stack;
