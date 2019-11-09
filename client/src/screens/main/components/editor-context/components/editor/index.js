import React from "react";
import Button from "../../../../../../components/button";
import FloatBox from "../../../../../../components/float-box";
import PostText from "../../../post-text";
import {ContentConnect} from "../../../content-context";

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
        this.props.edit(this.props.editor[1], this.state.content)
        .then(() => this.props.handleClickEditorClose());
    }
    render() {
        return (
            <FloatBox handleClose={this.props.handleClickEditorClose}>
                <form>
                    <label htmlFor="Text area" css={`
                        ${props => props.theme.screenreaderOnly}
                    `}>Text area</label>
                    <PostText
                        as="textarea"
                        name="Text area"
                        value={this.state.content}
                        onChange={this.handleChange}
                        autoFocus
                    />

                    {this.props.editor[0] === "add" ?
                    <Button onClick={this.handleAdd}>Add</Button> :
                    <Button onClick={this.handleEdit}>Edit</Button>}
                </form>
            </FloatBox>
        );
    }
}

export default ContentConnect(Editor);
