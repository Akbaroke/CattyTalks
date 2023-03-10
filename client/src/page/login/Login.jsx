import Container from '../../components/container/Container';
import style from './style.module.scss'
import googleIcon from '../../assets/google.svg'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/chattytalks.svg'

export default function Login() {
  const { isAuth } = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  const googleAuth = () => {
    window.open(
      `${
        import.meta.env.VITE_APP_URL
      }/auth/google/callback`,
      '_self'
    )
  }
  return (
    <Container>
      <div className={style.login}>
        <img
          className={style.logo}
          src={logo}
          alt="Chatty Talks"
        />
        <div onClick={googleAuth}>
          <img src={googleIcon} />
          <p>Continue with Google</p>
        </div>
      </div>
    </Container>
  )
}
