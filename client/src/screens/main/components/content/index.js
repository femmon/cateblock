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
                fetch("/create-entry", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({content: [content]})}).then(res => res.text()).then(id => {
                    this.setState({
                        posts: [{EntryID: id,
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
    edit(content) {
        return new Promise((resolve, reject) => {
            if (this.props.status === "try") {
                let posts = this.state.posts.map(post => {
                    if (post.EntryID !== this.state.editor[1]) return post;
                    post.Content = content;
                    post.PostTime = new Date().toISOString();
                    return post;
                });
                this.setState({posts}, resolve);
            } else {
                fetch("/edit-entry", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({content, entryID: this.state.editor[1]})}).then(res => {
                    let posts = this.state.posts.map(post => {
                        if (post.EntryID !== this.state.editor[1]) return post;
                        post.Content = content;
                        post.PostTime = new Date().toISOString();
                        post.Edited = 1;
                        return post;
                    });
                    this.setState({posts}, resolve);
                }).catch(err => reject(err));
            }
        });
    }
    postDelete(id) {
        if (this.props.status === "login") {
            fetch("/delete-entry", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({entryID: id})}).then(res => {
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
        fetch("/view-entries", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({offset: this.state.posts.length})}).then(res => res.json()).then(posts => {
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
        this.handleClickEditor("edit", id, this.state.posts.filter(post => post.EntryID === id)[0].Content);
    }
    componentDidMount() {
        if (this.props.status === "login") {
            fetch("/view-entries", {method: "POST"})
            .then(res => res.json())
            .then(posts => this.setState({posts}))
            .catch(err => {throw err;});
            // remove this fetch with this.view()
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status && this.state.posts !== []) {
            fetch("/create-entry", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({content: this.state.posts.map(post => post.Content).reverse()})
            }).then(res => res.text()).then(id => {
                let posts = this.state.posts.map((post, index) => {
                    post.EntryID = Number(id) + this.state.posts.length - index - 1;
                    return post;
                });
                return posts;
            }).then(posts => this.setState({posts})).catch(err => {throw err;});

        }
    }
    render() {
        return (
            <React.Fragment>
                <Stack posts={this.state.posts} edit={content => this.edit(content)} postDelete={id => this.postDelete(id)} handleClickEditorEdit={id => this.handleClickEditorEdit(id)} />
                {this.state.editor[0] && <Editor editor={this.state.editor} handleClickEditorClose={() => this.handleClickEditorClose()} add={content => this.add(content)} edit={content => this.edit(content)} />}
                <div onClick={this.handleClickEditorAdd}>Add</div>
                {this.props.status === "login" && <ViewButton view={() => this.view()} />}
            </React.Fragment>
        );
    }
}

export default Content;
