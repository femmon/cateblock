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
        this.download = this.download.bind(this);
    }
    handleToggle() {
        this.setState({active: !this.state.active});
    }
    download() {
        fetch("/entries/all")
        .then(res => res.blob())
        .then(blob => {
            let url = URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = "posts.zip";
            //Need to append to the DOM, otherwise it will not work in Firefox
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            a.remove();

            this.handleToggle()
        });

    }
    render() {
        return (<React.Fragment>
            <span onClick={this.handleToggle}>👤</span>

            {this.state.active && <FloatBox handleClose={this.handleToggle}>
                <p>Make an offline copy</p>
                <Button onClick={this.download}>Download</Button>

                <p>Delete account</p>
                <Button
                    onClick={this.props.handleDeleteAccount}
                >Delete</Button>
            </FloatBox>}
        </React.Fragment>);
    }
}

export default AccountSetting;
