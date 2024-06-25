import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSignupMutation } from '../api/auth';
import { setUserData } from '../store/slices/appSlice';
import { appPaths } from '../routes';
import useAuth from '../hooks';

const Signup = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();
  const signupSchema = Yup.object().shape({
    nickname: Yup.string()
      .required('required')
      .min(3, 'range')
      .max(20, 'range'),
    password: Yup.string()
      .required('required')
      .min(6, 'min'),
    passwordConfirm: Yup.string()
      .required('required')
      .oneOf([Yup.ref('password'), null], 'passwordMustMatch'),
  });
  const handleFormSubmit = async (values, { setErrors }) => {
    const { nickname, password } = values;
    const user = {
      username: nickname,
      password,
    };
    const { data, error } = await signup(user);
    if (data) {
      logIn(data.token, nickname);
      dispatch(setUserData({ nickname, token: data.token }));
      navigate(appPaths.home());
    }
    if (error) {
      switch (error.status) {
        case 409: {
          setErrors({ nickname: 'userExists' });
          break;
        }
        default: {
          setErrors({ nickname: 'nickname', password: 'password', passwordConfirm: 'passwordConfirm' });
        }
      }
    }
  };
  return (
    <Container className="mb-auto mt-auto">
      <Row className="justify-content-center">
        <Col xs="12" md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="row">
              <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
                <Image src="signup.jpg" alt="signup.jpg" />
              </Col>
              <Col xs="12" md="6">
                <Formik
                  initialValues={{ nickname: '', password: '', passwordConfirm: '' }}
                  onSubmit={handleFormSubmit}
                  validationSchema={signupSchema}
                  validateOnChange={false}
                >
                  {({
                    handleSubmit, handleChange, values, errors,
                  }) => (
                    <Form onSubmit={handleSubmit} className="form">
                      <h1>signupPageTitle</h1>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="nickname">signupPageNickname</Form.Label>
                        <Form.Control required id="nickname" value={values.nickname} onChange={handleChange} type="text" name="nickname" isInvalid={!!errors.nickname} />
                        <Form.Control.Feedback type="invalid">{errors.nickname}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="password">Пароль</Form.Label>
                        <Form.Control required id="password" value={values.password} onChange={handleChange} type="password" name="password" isInvalid={!!errors.password} />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="passwordConfirm">Подтвердите пароль</Form.Label>
                        <Form.Control required id="passwordConfirm" value={values.passwordConfirm} onChange={handleChange} type="password" name="passwordConfirm" isInvalid={!!errors.passwordConfirm} />
                        <Form.Control.Feedback type="invalid">{errors.passwordConfirm}</Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" className="w-100" variant="outline-primary">signupPageButton</Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
