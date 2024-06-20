import { Formik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useAuth from '../hooks';
import { useLoginMutation } from '../api/auth';

const Login = () => {
  const { logIn } = useAuth();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const submitForm = async (values) => {
    const { nickname, password } = values;
    const user = {
      username: nickname,
      password,
    };
    const { data } = await login(user);
    if (data) {
      logIn(data.token, nickname);
      navigate('/');
    }
  };
  const title = 'Войти';
  const name = 'Имя';
  const passwdName = 'Пароль';
  const footerText = 'Нет аккаунта?';
  const loginPageFooterLink = 'Регистрация';
  const loginPageButton = 'Войти';
  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs="12" md="8" xxl="8">
          <Card className="shadow-sm">
            <Card.Body className="row">
              <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
                <Image src="login.jpeg" alt={title} />
              </Col>
              <Col xs="12" md="6">
                <Formik
                  initialValues={{ nickname: '', password: '' }}
                  onSubmit={submitForm}
                >
                  {({
                    handleSubmit, handleChange, values, errors,
                  }) => (
                    <Form onSubmit={handleSubmit} className="form">
                      <h1>{title}</h1>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="nickname">{name}</Form.Label>
                        <Form.Control
                          id="nickname"
                          required
                          value={values.nickname}
                          onChange={handleChange}
                          type="text"
                          name="nickname"
                          isInvalid={!!errors.password}
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 position-relative">
                        <Form.Label htmlFor="password">{passwdName}</Form.Label>
                        <Form.Control
                          id="password"
                          required
                          value={values.password}
                          onChange={handleChange}
                          type="password"
                          name="password"
                          isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" className="w-100" variant="outline-primary">{loginPageButton}</Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {footerText}
                  {' '}
                  <Link to="/signup">{loginPageFooterLink}</Link>
                </span>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
