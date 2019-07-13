import React from "react";
import Button from "../../../../components/button";
import FloatBox from "../../../../components/float-box";

class AccountSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle() {
        this.setState({active: !this.state.active});
    }
    render() {
        return (<React.Fragment>
            <span onClick={this.handleToggle}>👤</span>

            {this.state.active && <FloatBox handleClose={this.handleToggle}>
                <p>Make an offline copy</p>
                <Button
                    onClick={() => alert("Under construction")}
                >Download</Button>

                <p>Delete account</p>
                <Button
                    onClick={this.props.handleDeleteAccount}
                >Delete</Button>
            </FloatBox>}
        </React.Fragment>);
    }
}

export default AccountSetting;
