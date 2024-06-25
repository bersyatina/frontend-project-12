import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  channelsApi,
  useGetChannelsQuery,
} from '../../api/channels';
import Channel from './Channel';
import { setChannelModal } from '../../store/slices/appSlice';
import ModalContainer from '../modals';
import socket from '../../socket';

const Channels = () => {
  const { data: channels = [] } = useGetChannelsQuery();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleShowModal = (modalName, channel = { id: '', name: '' }) => {
    dispatch(setChannelModal({ id: channel.id, name: channel.name, modalName }));
  };
  useEffect(() => {
    const handleNewChannel = (channel) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel);
      }));
    };
    const handleRemoveChannel = ({ id }) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.filter((curChannels) => curChannels.id !== id)));
    };
    const handleRenameChannel = ({ id, name }) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const channel = draft;
        const index = channel.findIndex((curChannels) => curChannels.id === id);
        channel[index].name = name;
      }));
    };
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);
    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch]);

  return (
    <Col xs="4" md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
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
