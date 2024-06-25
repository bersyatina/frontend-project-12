import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Channels from '../components/channels/Channels';
import Messages from '../components/messages/Messages';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.nickname === undefined) {
      navigate('/login');
    }
  });

  return (
    <Container className="rounded shadow h-100 mb-2">
      <Row className="bg-white flex-md-row h-100">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default Home;
