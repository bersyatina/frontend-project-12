import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Header from './components/Header';
import { appPaths } from './routes';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path={appPaths.notFound()} element={<NotFound />} />
      <Route path={appPaths.home()} element={<Home />} />
      <Route path={appPaths.login()} element={<Login />} />
      <Route path={appPaths.signup()} element={<Signup />} />
    </Routes>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
