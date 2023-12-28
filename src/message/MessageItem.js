import { Message, Profile, DateBox, Date, Name, MessageText, MessageImage, TimeBox } from './MessageCss';
import { getImageUrl } from '../database/api';
import { useMemo, useState, useEffect } from 'react';

export const DateItem = ({ date }) => {
  return (
    <DateBox>
      <Date>{date}</Date>
    </DateBox>
  );
};

export const MessageItem = (params) => {
  const [url, setUrl] = useState('');

  const { date, time, send_name, message, fileName } = params['params'];
  const baseUrl = params['imageUrl'];

  useEffect(() => {
    if (message === '(사진)') {
      fetch(`${baseUrl}/object/public/images/${fileName}.JPG`)
        .then((response) => {
          if (response.status === 200) {
            setUrl(response.url);
            return true;
          }
          return false;
        })
        .then((isOk) => {
          if (!isOk) {
            setUrl(`${baseUrl}/object/public/images/${fileName}.jpg`);
          }
        });
    }
  }, [, message]);

  return (
    <Message key={`${date}${time}`}>
      <Profile src={`${baseUrl}/object/public/images/profile.JPG`}></Profile>
      <div>
        <Name>{send_name}</Name>
        {message === '(사진)' ? (
          <a href={url} target="_blank">
            <MessageImage src={url} alt={fileName}></MessageImage>
          </a>
        ) : (
          // <MessageImage style={{ backgroundImage: `url(${url})` }}></MessageImage>
          // <MessageImage></MessageImage>
          <MessageText>{message.indexOf('\\n') !== -1 ? message.replaceAll('\\n', '\n') : message}</MessageText>
        )}
      </div>
      <TimeBox>
        <span>{time}</span>
      </TimeBox>
    </Message>
  );
};
