import styled from "styled-components";

const Button = styled.button`
    border: ${props => props.emphasis ? "" : ""};
    color: ${props => props.emphasis ? "" : ""};
    background: ${props => props.emphasis ? "" : ""};
`;

export default Button;
