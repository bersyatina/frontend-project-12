import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { changeChannel } from '../../store/slices/appSlice';

const Channel = ({ data }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const variantButton = data.id === currentChannelId ? 'secondary' : 'light';
  const switchChannel = () => {
    const { id, name } = data;
    if (id !== currentChannelId) {
      dispatch(changeChannel({ id, name }));
    }
  };
  return (
    <Nav.Item>
      {data.removable ? (
        <Dropdown as={ButtonGroup} drop="down" className="w-100">
          <Button onClick={() => switchChannel()} className="w-100 rounded-0 text-start text-truncate" variant={variantButton}>{`# ${data.name}`}</Button>
        </Dropdown>
      ) : (
        <Button
          as={ButtonGroup}
          variant={variantButton}
          className="w-100 text-start rounded-0 text-truncate"
          onClick={() => switchChannel(data)}
        >
          {`# ${data.name}`}
        </Button>
      )}
    </Nav.Item>
  );
};

export default Channel;
