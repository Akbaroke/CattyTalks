import Container from '../../components/container/Container';
import './Login.scss';
import googleIcon from '../../assets/google.svg';
import React from 'react';

export default function Login() {
  const googleAuth = () => {
    window.open(`${import.meta.env.VITE_APP_URL}/auth/google/callback`, '_self');
  };
  return (
    <Container>
      <div className="login">
        <h1>Log in</h1>
        <div onClick={googleAuth}>
          <img src={googleIcon} />
          <p>Continue with Google</p>
        </div>
      </div>
    </Container>
  );
}
