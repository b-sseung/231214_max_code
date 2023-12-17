import { Message, Profile } from "./MessageItemCss";

const MessageItem = (params) => {
  const { date, time, send_name, message } = params["params"];
  return (
    <Message key={`${date}${time}`}>
      <Profile></Profile>
      <div>
        <p>{send_name}</p>
        <p>{message}</p>
      </div>
      <div>
        <span>{time}</span>
      </div>
    </Message>
  );
};

export default MessageItem;
