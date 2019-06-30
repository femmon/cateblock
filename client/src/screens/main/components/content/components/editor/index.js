import React from "react";
import FloatBox from "../../../../../../components/float-box"

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.editor[2]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleChange(event) {
        this.setState({content: event.target.value});
    }
    handleAdd(event) {
        event.preventDefault();
        this.props.add(this.state.content).then(() => this.props.handleClickEditorClose());
    }
    handleEdit(event) {
        event.preventDefault();
        this.props.edit(this.state.content).then(() => this.props.handleClickEditorClose());
    }
    render() {
        return (
            <FloatBox handleClose={this.props.handleClickEditorClose}>
                <label htmlFor="Text area">Text area</label>
                <input
                    name="Text area"
                    value={this.state.content}
                    onChange={this.handleChange}
                />

                {this.props.editor[0] === "add" ?
                <button onClick={this.handleAdd}>Add</button> :
                <button onClick={this.handleEdit}>Edit</button>}
            </FloatBox>
        );
    }
}

export default Editor;
