import React from "react";

class Hamburger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
        this.handleClose = this.handleClose.bind(this);
    }
    handleToggle() {
        this.setState({active: !this.state.active});
    }
    handleClose() {
            this.handleToggle();
            document.removeEventListener("click", this.handleClose);
    }
    render() {
        return (<div>
            <button onClick={() => {
                this.handleToggle();
                document.addEventListener("click", this.handleClose);
            }}>🍔</button>

            {this.state.active && <div onClick={event => event.stopPropagation()}>
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
