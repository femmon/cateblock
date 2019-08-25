import styled from "styled-components";

const PostText = styled.p`
    font-family: ${props => props.theme.handwritingFont};
    font-size: 18px;
    white-space: pre-wrap;
`;

export default PostText;
