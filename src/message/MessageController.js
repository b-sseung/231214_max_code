import { useState, useEffect, useCallback } from 'react';
import { getChatData } from '../database/api';
import { MessageItem, DateItem } from './MessageItem';
import { MessageText, Messages } from './MessageCss';
import $ from 'jquery';
import { type } from '@testing-library/user-event/dist/type';

const MessageController = () => {
  const [chatData, setChatData] = useState(new Array());
  const [showData, setShowData] = useState(new Array());
  const [count, setCount] = useState(0);
  const [pastHeight, setPastHeight] = useState();

  useEffect(() => {
    getChatData().then((result) => {
      let tempData = new Map();
      for (let i = result.length - 1; i > Math.max(result.length - 20, 0); i--) {
        let arr = tempData.get(result[i].date) == null ? new Array() : tempData.get(result[i].date);
        arr.unshift(result[i]);
        tempData.set(result[i].date, arr);
      }

      let tempDataAsc = [...tempData];

      setChatData(result);
      setCount(10);
      setShowData(tempDataAsc.sort());
    });
  }, []);

  useEffect(() => {
    $('#messages').scrollTop(
      pastHeight === 0 ? $('#messages').prop('scrollHeight') : $('#messages').prop('scrollHeight') - pastHeight
    );
    setPastHeight($('#messages').prop('scrollHeight'));
  }, [showData]);

  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop === 0) {
      let tempData = new Map();
      let start = chatData.length - 1;
      let end = Math.max(chatData.length - count - 20, 0);

      for (let i = start; i > end; i--) {
        let arr = tempData.get(chatData[i].date) == null ? new Array() : tempData.get(chatData[i].date);
        arr.unshift(chatData[i]);
        tempData.set(chatData[i].date, arr);
      }

      let tempDataAsc = [...tempData];

      setShowData(tempDataAsc.sort());
      setCount(chatData.length - end);
    }
  };

  return (
    <Messages id="messages" onScroll={handleScroll}>
      {showData.map((element) => {
        return (
          <div key={element[0]}>
            <DateItem date={element[0]}></DateItem>
            {element[1].map((item, index) => {
              return <MessageItem params={item} key={index}></MessageItem>;
            })}
          </div>
        );
      })}
    </Messages>
  );
};

export default MessageController;
