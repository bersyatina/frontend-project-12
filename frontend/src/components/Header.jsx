import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/esm/Button';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = () => (
  <Navbar expand="lg" className="shadow-sm bg-white">
    <Container>
      <Link className="navbar-brand" to="/">Hexlet Chat</Link>
    </Container>
  </Navbar>
);

export default Header;
