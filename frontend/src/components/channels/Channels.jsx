import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import {
  // channelsApi,
  useGetChannelsQuery,
} from '../../api/channels';
import Channel from './Channel';
import { setChannelModal } from '../../store/slices/appSlice';
import ModalContainer from '../modals';

const Channels = () => {
  const { data: channels = [] } = useGetChannelsQuery();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleShowModal = (modalName, channel = { id: '', name: '' }) => {
    dispatch(setChannelModal({ id: channel.id, name: channel.name, modalName }));
  };

  return (
    <Col xs="4" md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button size="sm" variant="outline-primary" onClick={() => handleShowModal('adding')}>
          +
        </Button>
      </div>
      <Nav className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel key={channel.id} data={channel} />
        ))}
      </Nav>
      <ModalContainer />
    </Col>
  );
};

export default Channels;
