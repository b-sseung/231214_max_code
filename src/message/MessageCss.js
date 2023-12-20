import styled, { css } from 'styled-components';

export const Messages = styled.div(
  css`
    overflow: scroll;
    flex-grow: 1;

    display: flex;
    flex-direction: column;
  `
);

export const Message = styled.div(
  css`
    display: flex;
    flex-direction: row;
    padding: 10px;

    margin: 10px 0;
  `
);

export const Profile = styled.div(
  css`
    width: 50px;
    height: 50px;
    flex-shrink: 0;

    margin-right: 10px;
    margin-top: 5px;
    border-radius: 100px;

    background: black;
  `
);

export const DateBox = styled.div(
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `
);

export const Date = styled.span(
  css`
    text-align: center;

    padding: 5px 30px;
    background: white;
    border-radius: 100px;
  `
);

export const Name = styled.div(
  css`
    margin: 0;
  `
);

export const MessageText = styled.div(
  css`
    white-space: pre-wrap;
    background: white;

    margin: 5px 0;
    padding: 10px 15px;

    border-radius: 5px 15px 15px 15px;
  `
);

export const TimeBox = styled.div(
  css`
    display: flex;
    align-items: end;

    margin-left: 10px;
    padding-bottom: 10px;
  `
);
