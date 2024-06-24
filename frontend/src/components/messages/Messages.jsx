import Col from 'react-bootstrap/esm/Col';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useGetMessagesQuery } from '../../api/messages';
import Message from './Message';

const Messages = () => {
  const { data: messages = [] } = useGetMessagesQuery();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const currentChannelName = useSelector((state) => state.app.currentChannelName);
  const filteredMessages = messages.filter((message) => message.channelId === currentChannelId);
  const messagesContainer = useRef();
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
            {filteredMessages.length}
            {' '}
            messages.messages
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
