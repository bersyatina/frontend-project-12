import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Signup from './pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { appPaths } from './routes';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path={appPaths.signup()} element={<Signup />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
