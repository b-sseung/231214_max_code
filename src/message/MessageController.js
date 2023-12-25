import { useState, useEffect, useCallback } from 'react';
import { getImageBaseUrl, getChatData } from '../database/api';
import { MessageItem, DateItem } from './MessageItem';
import { MessageText, Messages } from './MessageCss';
import $ from 'jquery';

const MessageController = () => {
  const [chatData, setChatData] = useState(new Array());
  const [showData, setShowData] = useState(new Array());
  const [count, setCount] = useState(0);
  const [pastHeight, setPastHeight] = useState();
  const [imageBaseUrl, setImageBaseUrl] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    getImageBaseUrl('images').then((result) => {
      setImageBaseUrl(result);
      return result;
    });
  }, []);

  useEffect(() => {
    getChatData()
      .then((result) => {
        let lastName = '';
        let firstFile = 0;
        let cnt = 1;

        for (let i = 0; i < result.length; i++) {
          if (result[i].message !== '(사진)') continue;

          let filename = result[i].date.replaceAll('/', '');

          if (lastName === result[i].date) {
            if (cnt === 1) result[firstFile].fileName = `${filename} (${cnt})`;

            cnt++;
            result[i].fileName = `${filename} (${cnt})`;
          } else {
            lastName = result[i].date;
            cnt = 1;
            firstFile = i;
            result[i].fileName = filename;
          }
        }

        return result;
      })
      .then((result) => {
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
  }, [imageBaseUrl]);

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
              return <MessageItem params={item} imageUrl={imageBaseUrl} key={index}></MessageItem>;
            })}
          </div>
        );
      })}
    </Messages>
  );
};

export default MessageController;
