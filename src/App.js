import logo from './logo.svg';
import './App.css';
import styled, { css } from 'styled-components';
import Header from './header/Header.js';
import MessageController from './message/MessageController.js';

function App() {
  const Body = styled.div(
    css`
      height: 100vh;

      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;

      background-color: #f1f1f1;
    `
  );

  return (
    <Body>
      <Header></Header>
      <MessageController></MessageController>
    </Body>
  );
}

export default App;
