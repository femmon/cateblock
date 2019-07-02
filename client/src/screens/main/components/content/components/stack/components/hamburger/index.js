import React from "react";

class Hamburger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
    }
    handleClickOpen() {
        this.setState({active: true});
        document.addEventListener("click", this.handleClickClose);
    }
    handleClickClose() {
        this.setState({active: false});
        document.removeEventListener("click", this.handleClickClose);
    }
    render() {
        return (<div>
            <button onClick={this.handleClickOpen}>🍔</button>

            {this.state.active && <div>
                <button onClick={() => {
                    if (this.props.isOpeningHistory) {
                        this.props.closeViewEdit();
                    }
                    this.props.handleClickEditorEdit();
                }}>Editor </button>

                {this.props.Edited !== 0 && <button onClick={() => {
                    // Close any open post history first, then open the requested one.
                    this.props.closeViewEdit();
                    this.props.viewEdit();
                }}>View edit </button>}

                <button onClick={() => {
                    // To clear the close click event handler
                    document.body.click();
                    this.props.postDelete();
                }}>Delete</button>
            </div>}
        </div>);
    }
}

export default Hamburger;
