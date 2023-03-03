import { useEffect } from 'react';
import axios from '../api/index';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../redux/actions/user';

export default function User({ children }) {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);

  const getAuthInfo = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/auth/login/success`, { withCredentials: true });
    dispatch(setLogin(data.user._json.sub, data.user._json.name, data.user._json.email, data.user._json.picture));
  };

  useEffect(() => {
    if (!isAuth) {
      getAuthInfo();
    }
  }, []);
  return children;
}
