import React from "react";

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.editor[2]
        }
        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
    }
    handleChange(event) {
        this.setState({content: event.target.value});
    }
    add(event) {
        event.preventDefault();
        this.props.add(this.state.content).then(() => this.props.handleClickEditorClose());
    }
    edit(event) {
        event.preventDefault();
        this.props.edit(this.state.content).then(() => this.props.handleClickEditorClose());
    }
    render() {
        return (
            <div style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#bababa"}} onClick={this.props.handleClickEditorClose}>
                <div onClick={event => event.stopPropagation()}>
                    <label htmlFor="Text area">Text area</label>
                    <input name="Text area" value={this.state.content} onChange={this.handleChange} />
                    {this.props.editor[0] === "add" ? <button onClick={this.add}>Add</button> : <button onClick={this.edit}>Edit</button>}
                </div>
            </div>
        );
    }
}

export default Editor;
