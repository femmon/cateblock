import React from "react";
import Button from "../../../../components/button";
import FloatBox from "../../../../components/float-box";
import FormContainer from "../../../../components/form-container";

class AccessAccount extends React.Component {
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
            <Button
                onClick={this.handleToggle}
                emphasis
            >Log in/Sign up</Button>

            {this.state.active && <FloatBox handleClose={this.handleToggle}>
                <FormContainer
                    handleStateLogin={username => {
                        this.props.handleStateLogin(username);
                    }}
                />
            </FloatBox>}
        </React.Fragment>);
    }
}

export default AccessAccount;
