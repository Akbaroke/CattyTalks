import React from 'react'
import style from './style.module.scss'
import Container from '../../components/container/Container'

export default function Chat() {
  const code = props.match.params.code
  return (
    <Container>
      <div>
        <p>Room ID : {code}</p>
      </div>
    </Container>
  )
}
