import { useState, useEffect, useCallback } from 'react';
import { getImageBaseUrl, getChatData } from '../database/api';
import { MessageItem, DateItem } from './MessageItem';
import { MessageText, Messages } from './MessageCss';
import $ from 'jquery';
import { connect } from 'react-redux';
import { setImageBaseUrl, set, load, changeCount, setScroll } from '../modules/chat';

const MessageController = ({
  imageBaseUrl,
  chatHistory,
  showHistory,
  scrollHeight,
  setImageBaseUrl,
  count,
  set,
  load,
  setScroll,
}) => {
  console.log('MessageController');

  useEffect(() => {
    console.log('first');
    const binding = async () => {
      await getImageBaseUrl('images').then((url) => {
        setImageBaseUrl(url);
      });
    };

    binding();
  }, []);

  useEffect(() => {
    console.log('second');
    const urlChangeEvent = async () => {
      await getChatData().then((historys) => {
        console.log('third');
        let lastName = '';
        let firstFile = 0;
        let cnt = 1;

        for (let i = 0; i < historys.length; i++) {
          if (historys[i].message !== '(사진)') continue;

          let filename = historys[i].date.replaceAll('/', '');

          if (lastName === historys[i].date) {
            if (cnt === 1) historys[firstFile].fileName = `${filename} (${cnt})`;

            cnt++;
            historys[i].fileName = `${filename} (${cnt})`;
          } else {
            lastName = historys[i].date;
            cnt = 1;
            firstFile = i;
            historys[i].fileName = filename;
          }
        }
        set(historys);
      });
    };

    urlChangeEvent();

    changeCount();
    load();
  }, [imageBaseUrl]);

  useEffect(() => {
    console.log('fifth');
    setScroll($('#messages').prop('scrollHeight'));
    const tempHeight = $('#messages').prop('scrollHeight') - scrollHeight;
    $('#messages').scrollTop(tempHeight);
  }, [showHistory]);

  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop === 0) {
      load();
    }
  };
  console.log(showHistory);
  console.log(count);
  return (
    <Messages id="messages" onScroll={handleScroll}>
      {/* {showHistory.map((element) => {
            return (
              <div key={element[0]}>
                <DateItem date={element[0]}></DateItem>
                {element[1].map((item, index) => {
                  return <MessageItem params={item} imageUrl={imageBaseUrl} key={index}></MessageItem>;
                })}
              </div>
            );
          })} */}
    </Messages>
  );
};

export default connect(
  ({ chats }) => ({
    scrollHeight: chats.scrollHeight,
    chatHistory: chats.chatHistory,
    showHistory: chats.showHistory,
    imageBaseUrl: chats.impageBaseUrl,
    count: chats.count,
  }),
  {
    setImageBaseUrl,
    set,
    load,
    changeCount,
    setScroll,
  }
)(MessageController);
