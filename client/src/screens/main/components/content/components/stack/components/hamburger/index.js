import React from "react";

class Hamburger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            numTouch: 0,
            lastTouch: null
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }
    handleClickOpen() {
        this.setState({active: true});
        document.addEventListener("click", this.handleClickClose);
        document.addEventListener("touchstart", this.handleTouchStart);
        document.addEventListener("touchend", this.handleTouchEnd);
    }
    handleClickClose() {
        this.setState({
            active: false,
            numTouch: 0,
            lastTouch: null
        });
        document.removeEventListener("click", this.handleClickClose);
        document.removeEventListener("touchstart", this.handleTouchStart);
        document.removeEventListener("touchend", this.handleTouchEnd);
    }
    handleTouchStart() {
        if (this.state.numTouch === 0) {
            this.setState({
                numTouch: 1,
                lastTouch: new Date().getTime()
            });
        } else {
            this.setState({
                numTouch: this.state.numTouch + 1,
                lastTouch: null
            });
        }
    }
    handleTouchEnd() {
        if (
            this.state.numTouch === 1 &&
            new Date().getTime() - this.state.lastTouch < 100
        ) {
            this.handleClickClose();
        } else {
            this.setState({
                numTouch: this.state.numTouch - 1,
                lastTouch: null
            });
        }
    }
    componentWillUnmount() {
        this.handleClickClose();
    }
    render() {
        return (<div
            /* The order of events: synthetic touch (using React onEvent
             * attribute), raw touch (event from addEventListener),
             * synthetic click, raw click.
             * StopImmediateIropagation so the handleTouchEnd() doesn't close
             * popup before onclick inside popup work. Then, handleClickClose
             * closes the popup.
             */
            onTouchStart={event => event.nativeEvent.stopImmediatePropagation()}
            onTouchEnd={event => event.nativeEvent.stopImmediatePropagation()}
            /* onTouchStart and onTouchEnd can also place at popup div below,
             * but the first click inside the popup will fail because
             * addEventListener of touchstart, touchend is run before React bind
             * its listener (which is when it render something that listen to
             * event)
             */
        >
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

                <button onClick={this.props.postDelete}>Delete</button>
            </div>}
        </div>);
    }
}

export default Hamburger;
