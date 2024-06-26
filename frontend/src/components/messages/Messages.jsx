import Col from 'react-bootstrap/esm/Col';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { messagesApi, useGetMessagesQuery } from '../../api/messages';
import Message from './Message';
import socket from '../../socket';

const Messages = () => {
  const { data: messages = [] } = useGetMessagesQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const currentChannelName = useSelector((state) => state.app.currentChannelName);
  const filteredMessages = messages.filter((message) => message.channelId === currentChannelId);
  const messagesContainer = useRef();

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(newMessage);
      }));
    };
    socket.on('newMessage', handleNewMessage);
    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);
  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="mb-0">
            <b>
              {`# ${currentChannelName}`}
            </b>
          </p>
          <span className="text-muted">
            {t('messages', { count: filteredMessages.length })}
          </span>
        </div>
        <div className="overflow-auto px-5" ref={messagesContainer}>
          {filteredMessages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>
              :
              {message.message}
            </div>
          ))}
        </div>
        <Message />
      </div>
    </Col>
  );
};

export default Messages;
