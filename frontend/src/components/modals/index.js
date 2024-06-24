import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import NewChannel from './NewChannel';
import { setChannelModal } from '../../store/slices/appSlice';
import { useGetChannelsQuery } from '../../api/channels';

const modals = {
  adding: NewChannel,
};

const ModalContainer = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const modalChannelId = useSelector((state) => state.app.modalChannelId);
  const { data: channels = [] } = useGetChannelsQuery();
  const channelsNames = channels.map((channel) => channel.name);
  const channelNameSchema = Yup.object().shape({
    channelName: Yup.string().notOneOf(channelsNames, 'channelExists').min(3, 'form.errors.range').max(20, 'form.errors.range')
      .required('form.errors.required'),
  });
  const handleCloseModal = () => {
    dispatch(setChannelModal({ id: '', name: '', modalName: '' }));
  };
  const showModal = useSelector((state) => state.app.showModal);
  const ModalComponent = modals[showModal];
  if (!ModalComponent) {
    return null;
  }
  return (
    <ModalComponent
      handleCloseModal={handleCloseModal}
      showModal={showModal}
      currentChannelId={currentChannelId}
      modalChannelId={modalChannelId}
      dispatch={dispatch}
      channelNameSchema={channelNameSchema}
    />
  );
};

export default ModalContainer;
