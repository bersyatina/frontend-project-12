import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import useAuth from '../hooks';
// import { useLoginMutation } from '../api/auth';

const Home = () => {
  const name = 'Home Page';
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.nickname === undefined) {
      navigate('/login');
    }
  });

  return (
    <Container className="rounded shadow h-100 mb-2">
      <Row className="bg-white flex-md-row h-100">
        <div>{name}</div>
      </Row>
    </Container>
  );
};

export default Home;
