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
                    className="downloadButton"
                    content="Download"
                    onClick={() => alert("Under construction")}
                />
                <p>Delete account</p>
                <Button
                    className="deleteAccButton"
                    content="Delete"
                    onClick={this.props.handleDeleteAccount}
                />
            </FloatBox>}
        </React.Fragment>);
    }
}

export default AccountSetting;
