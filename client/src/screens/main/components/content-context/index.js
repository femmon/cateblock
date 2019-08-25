import React from "react";

const ContentContext = React.createContext();

class ContentProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            counter: -1
        }
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.view = this.view.bind(this);
        this.postDelete = this.postDelete.bind(this);
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

    edit(id, content) {
        return new Promise((resolve, reject) => {
            // Check to see if user has made any changes
            let editingPost = this.state.posts.find(post => {
                return post.EntryID === id;
            });
            if (editingPost.Content === content) return resolve();

            // Overide the old one if the status is "try"
            if (this.props.status === "try") {
                let posts = this.state.posts.map(post => {
                    if (post.EntryID !== id) return post;

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
                        entryID: id
                    })
                }).then(res => {
                    let posts = this.state.posts.map(post => {
                        if (post.EntryID !== id) return post;

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
            <ContentContext.Provider value={{
                ...this.state,
                add: this.add,
                edit: this.edit,
                view: this.view,
                postDelete: this.postDelete
            }}>
                {this.props.children}
            </ContentContext.Provider>
        );
    }
}

function ContentConnect(Child) {
    return function(props) {
        return (
            <ContentContext.Consumer>
                {contentValueObject => <Child {...props} {...contentValueObject}/>}
            </ContentContext.Consumer>
        );
    };
}

export {ContentProvider, ContentConnect};
