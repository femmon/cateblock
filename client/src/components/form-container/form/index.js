import React from "react";
import Button from "../../button";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    render() {
        return (<form css={`
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        `}>
            <label
                css={`grid-column: span 2;`}
                htmlFor="username"
            >Username</label>
            <input
                css={`grid-column: span 2;`}
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                autoFocus
            />

            <label
                css={`grid-column: span 2;`}
                htmlFor="password"
            >Password</label>
            <input
                css={`grid-column: span 2;`}
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
            />

            <Button
                onClick={event => {
                    // Prevent from reload
                    event.preventDefault();
                    this.props.handleClickLogin(this.state.username, this.state.password);
                }}
            >Log In</Button>

            <Button
                onClick={event => {
                    // Prevent from reload
                    event.preventDefault();
                    this.props.handleClickSignup(this.state.username, this.state.password);
                }}
            >Sign Up</Button>
        </form>);
    }
}

export default Form;
