import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Auth({ children }) {
  const { isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [isAuth]);
  return children;
}

export default Auth;
