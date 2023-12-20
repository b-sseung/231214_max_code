import { Message, Profile, DateBox, Date, Name, MessageText, TimeBox } from './MessageCss';

export const DateItem = ({ date }) => {
  return (
    <DateBox>
      <Date>{date}</Date>
    </DateBox>
  );
};

export const MessageItem = (params) => {
  const { date, time, send_name, message } = params['params'];
  return (
    <Message key={`${date}${time}`}>
      <Profile></Profile>
      <div>
        <Name>{send_name}</Name>
        <MessageText>{message.indexOf('\\n') !== -1 ? message.replace('\\n', '\n') : message}</MessageText>
      </div>
      <TimeBox>
        <span>{time}</span>
      </TimeBox>
    </Message>
  );
};
