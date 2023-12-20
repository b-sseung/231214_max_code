import styled, { css } from 'styled-components';

const HeaderDiv = styled.div(
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;

    text-align: center;
  `
);

const Name = styled.p(
  css`
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  `
);

const Header = () => {
  const startDate = new Date('2021-02-10');
  const today = new Date();

  let dDay = Math.abs(today.getTime() - startDate.getTime());
  dDay = Math.ceil(dDay / (1000 * 60 * 60 * 24));

  return (
    <HeaderDiv>
      <Name>삼돌</Name>
      <p>{`❤ + ${dDay}`}</p>
    </HeaderDiv>
  );
};

export default Header;
