import styled, { css } from "styled-components";

export const Messages = styled.div(
  css`
    overflow: scroll;
    height: 100vh;
  `
);

export const Message = styled.div(
  css`
    display: flex;
    flex-direction: row;
    padding: 10px;
  `
);

export const Profile = styled.div(
  css`
    width: 50px;
    height: 50px;
    flex-shrink: 0;

    margin-top: 20px;
    margin-right: 10px;

    border-radius: 100px;

    background: black;
  `
);
