import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/appSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const logIn = (token, nickname) => {
    localStorage.setItem('token', token);
    localStorage.setItem('nickname', nickname);
    dispatch(setUserData({ nickname, token }));
  };

  return { logIn };
};

export default useAuth;
