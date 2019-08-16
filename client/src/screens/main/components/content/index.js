import React from "react";
import Stack from "./components/stack";
import Editor from "./components/editor";
import ViewButton from "./components/view-button";

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            counter: -1,
            editor: [null, null, ""]
        }
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.view = this.view.bind(this);
        this.postDelete = this.postDelete.bind(this);
        this.handleClickEditor = this.handleClickEditor.bind(this);
        this.handleClickEditorClose = this.handleClickEditorClose.bind(this);
        this.handleClickEditorAdd = this.handleClickEditorAdd.bind(this);
        this.handleClickEditorEdit = this.handleClickEditorEdit.bind(this);
    }
    add(content) {
        return new Promise((resolve, reject) => {
            if (this.props.status === "try") {
                this.setState({
                    posts: [{
                        EntryID: this.state.counter,
                        Content: content,
                        PostTime: new Date().toISOString(),
                        Edited: 0
                    }].concat(this.state.posts),
                    counter: this.state.counter - 1
                }, resolve);
            } else {
                this.createEntries([content]).then(id => {
                    this.setState({
                        posts: [{
                            EntryID: id,
                            Content: content,
                            PostTime: new Date().toISOString(),
                            Edited: 0
                        }].concat(this.state.posts)
                    }, resolve);
                }).catch(err => reject(err));
            }
            // async
            // if login: fetch
            // then both setstate?
        });
    }
    createEntries(content) {
        return fetch("/entries", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({content})
        }).then(res => res.text());
    }

    edit(content) {
        return new Promise((resolve, reject) => {
            // Overide the old one if the status is "try"
            if (this.props.status === "try") {
                let posts = this.state.posts.map(post => {
                    if (post.EntryID !== this.state.editor[1]) return post;

                    return {
                        ...post,
                        Content: content,
                        PostTime: new Date().toISOString()
                    };
                });
                this.setState({posts}, resolve);
            } else {
                fetch("/entries", {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        content,
                        entryID: this.state.editor[1]
                    })
                }).then(res => {
                    let posts = this.state.posts.map(post => {
                        if (post.EntryID !== this.state.editor[1]) return post;

                        return {
                            ...post,
                            Content: content,
                            PostTime: new Date().toISOString(),
                            Edited: 1
                        };
                    });
                    this.setState({posts}, resolve);
                }).catch(err => reject(err));
            }
        });
    }
    postDelete(id) {
        if (this.props.status === "login") {
            fetch("/entries", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({entryID: id})
            }).then(res => {
                if (res && res.status === 200) {
                    let index = this.state.posts.findIndex(post => post.EntryID === id);
                    if (index !== -1) {
                        let posts = JSON.parse(JSON.stringify(this.state.posts));
                        // this wouldn't work if obj contain function
                        posts.splice(index, 1);
                        this.setState({posts});
                    }
                }
            });
        } else {
            let index = this.state.posts.findIndex(post => post.EntryID === id);
            if (index !== -1) {
                let posts = JSON.parse(JSON.stringify(this.state.posts));
                posts.splice(index, 1);
                this.setState({posts});
            }
        }
    }
    view() {
        fetch(`/entries/${this.state.posts.length}`)
        .then(res => res.json())
        .then(posts => {
            this.setState({
                posts: this.state.posts.concat(posts)
            });
        }).catch(err => {throw err;});
    }
    handleClickEditor(mode = null, id = null, content = "") {
        this.setState({editor: [mode, id, content]});
    }
    handleClickEditorClose() {
        this.handleClickEditor();
    }
    handleClickEditorAdd() {
        this.handleClickEditor("add");
    }
    handleClickEditorEdit(id) {
        let post = this.state.posts.find(post => post.EntryID === id);
        this.handleClickEditor("edit", id, post.Content);
    }
    componentDidMount() {
        if (this.props.status === "login") {
            this.view();
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.status === this.props.status) return;

        if (this.state.posts.length === 0) return this.view();

        let newPosts = this.state.posts.map(post => post.Content).reverse();

        this.createEntries(newPosts).then(id => {
            let posts = JSON.parse(JSON.stringify(this.state.posts));
            posts.forEach((post, index) => {
                post.EntryID = Number(id) + this.state.posts.length - index - 1;
            });

            this.setState({posts}, this.view);
        }).catch(err => {throw err;});
    }
    render() {
        return (
            <React.Fragment>
                <Stack
                    posts={this.state.posts}
                    postDelete={id => this.postDelete(id)}
                    handleClickEditorEdit={id => this.handleClickEditorEdit(id)}
                />

                {this.state.editor[0] && (
                    <Editor
                        editor={this.state.editor}
                        handleClickEditorClose={this.handleClickEditorClose}
                        add={content => this.add(content)}
                        edit={content => this.edit(content)}
                    />
                )}

                {this.props.status === "login" && (
                    <ViewButton view={() => this.view()} />
                )}

                <div>
                    <button onClick={this.handleClickEditorAdd}>Add</button>
                    <button onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth"
                        });
                    }}>Up</button>
                </div>
            </React.Fragment>
        );
    }
}

export default Content;
