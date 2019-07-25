import styled from "styled-components";

const Button = styled.button`
    border: none ${props => props.emphasis ? "" : ""};
    /*
     * Corner curves must not overlap, hence the round border:
     * https://drafts.csswg.org/css-backgrounds/#corner-overlap
     */
    border-radius: 9999px;
    color: white;
    background: ${props => props.emphasis ? "orange" : "#3BBDFF"};
    font-weight: bolder;
    padding: 10px 20px;
`;

export default Button;
